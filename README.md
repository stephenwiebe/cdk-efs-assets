# cdk-efs-assets

CDK construct library to populate Amazon EFS assets from Github or S3.

# Sample

The sample below creates the sync from github repository to Amazon EFS filesystem.

```ts
import { GithubSourceSync } from 'cdk-efs-assets';

const app = new App();

const env = {
  region: process.env.CDK_DEFAULT_REGION ?? AWS_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const stack = new Stack(app, 'testing-stack', { env });

const vpc = ec2.Vpc.fromLookup(stack, 'Vpc', { isDefault: true })

const fs = new efs.FileSystem(stack, 'Filesystem', {
  vpc,
  removalPolicy: RemovalPolicy.DESTROY,
})

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
  }
});

// create the one-time sync from Github repository to Amaozn EFS
new GithubSourceSync(stack, 'GithubSourceSync', {
  repository: 'https://github.com/pahud/cdk-efs-assets.git',
  efsAccessPoint,
  efsSecurityGroup: fs.connections.securityGroups,
  vpc,
})

```



