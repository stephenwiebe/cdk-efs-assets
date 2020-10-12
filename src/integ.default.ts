import * as ec2 from '@aws-cdk/aws-ec2';
import * as efs from '@aws-cdk/aws-efs';
import { App, Stack, RemovalPolicy } from '@aws-cdk/core';
import { GithubSourceSync } from './';

const AWS_DEFAULT_REGION = 'ap-northeast-1';

export class IntegTesting {
  readonly stack: Stack[];

  constructor() {
    const app = new App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION ?? AWS_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT ?? '11111111111',
    };

    const stack = new Stack(app, 'testing-stack', { env });

    const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', { isDefault: true });

    const fs = new efs.FileSystem(stack, 'Filesystem', {
      vpc,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const efsAccessPoint = fs.addAccessPoint('EfsAccessPoint', {
      path: '/demo',
      createAcl: {
        ownerGid: '1001',
        ownerUid: '1001',
        permissions: '0755',
      },
      posixUser: {
        uid: '1001',
        gid: '1001',
      },
    });

    // create the one-time sync from Github repository to Amaozn EFS
    new GithubSourceSync(stack, 'GithubSourceSync', {
      repository: 'https://github.com/pahud/cdk-efs-assets.git',
      efsAccessPoint,
      runsAfter: [fs.mountTargetsAvailable],
      vpc,
    });

    this.stack = [stack];
  };
}

// run the integ testing
new IntegTesting();
