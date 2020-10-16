import * as path from 'path';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as efs from '@aws-cdk/aws-efs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

export interface GithubSourceFeederProps {
  /**
   * The target Amazon EFS filesystem to clone the github repository to.
   */
  readonly efsAccessPoint: efs.AccessPoint;
  /**
   * The VPC of the Amazon EFS Filesystem.
   */
  readonly vpc: ec2.IVpc;
  /**
   * The github repository HTTP URI.
   */
  readonly repository: string;
  /**
   * The dependent resources before triggering the sync.
   */
  readonly runsAfter?: cdk.IDependable[];
}

export class GithubSourceSync extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: GithubSourceFeederProps ) {
    super(scope, id);

    const stack = cdk.Stack.of(this);
    const region = stack.region;

    const handler = new lambda.Function(this, 'Handler', {
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset(path.join(__dirname, '../lambda-handler')),
      handler: 'index.on_event',
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(this, 'GitLayer', `arn:aws:lambda:${region}:553035198032:layer:git-lambda2:7`),
      ],
      filesystem: lambda.FileSystem.fromEfsAccessPoint(props.efsAccessPoint, '/mnt/efsmount'),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE,
      },
      vpc: props.vpc,
      memorySize: 512,
      timeout: cdk.Duration.minutes(1),
      environment: {
        REPOSITORY_URI: props.repository,
        MOUNT_TARGET: '/mnt/efsmount',
      },
      currentVersionOptions: {
        provisionedConcurrentExecutions: 1,
      },
    });

    // create a custom resource to trigger the sync
    const myProvider = new cr.Provider(this, 'MyProvider', {
      onEventHandler: handler,
    });

    new cdk.CustomResource(this, 'SyncTrigger', { serviceToken: myProvider.serviceToken });

    // ensure the dependency
    if (props.runsAfter) {
      handler.node.addDependency(...props.runsAfter);
      // triggerResource.node.addDependency(...props.runsAfter);
    };

    // handler.node.addDependency(props.efsAccessPoint);
    // triggerResource.node.addDependency(props.efsAccessPoint);
  }
}
