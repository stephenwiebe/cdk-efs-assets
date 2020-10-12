const {
  AwsCdkConstructLibrary
} = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: "pahudnet@gmail.com",
  authorName: "Pahud Hsieh",
  cdkVersion: "1.67.0",
  name: "cdk-efs-assets",
  repository: "https://github.com/pahudnet/cdk-efs-assets.git",
  description: 'Amazon EFS assets from Github repositories or S3 buckets',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-efs',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-secretsmanager',
    '@aws-cdk/custom-resources',
  ],

  keywords: [
    'aws',
    'cdk',
    'efs',
    'github',
  ],

  catalog: {
    twitter: 'pahudnet',
    announce: false,
  },

  python: {
    distName: 'cdk-efs-assets',
    module: 'cdk_efs_assets'
  }
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
