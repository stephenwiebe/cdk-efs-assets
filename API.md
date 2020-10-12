# API Reference

**Classes**

Name|Description
----|-----------
[GithubSourceSync](#cdk-efs-assets-githubsourcesync)|*No description*


**Structs**

Name|Description
----|-----------
[GithubSourceFeederProps](#cdk-efs-assets-githubsourcefeederprops)|*No description*



## class GithubSourceSync  <a id="cdk-efs-assets-githubsourcesync"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new GithubSourceSync(scope: Construct, id: string, props: GithubSourceFeederProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[GithubSourceFeederProps](#cdk-efs-assets-githubsourcefeederprops)</code>)  *No description*
  * **efsAccessPoint** (<code>[AccessPoint](#aws-cdk-aws-efs-accesspoint)</code>)  The target Amazon EFS filesystem to clone the github repository to. 
  * **efsSecurityGroup** (<code>Array<[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)></code>)  The security group of the Amaozn EFS. 
  * **repository** (<code>string</code>)  The github repository HTTP URI. 
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  The VPC of the Amazon EFS Filesystem. 
  * **secretToken** (<code>[SecretValue](#aws-cdk-core-secretvalue)</code>)  The github personal access token(PAT) value from secrets manager. __*Optional*__




## struct GithubSourceFeederProps  <a id="cdk-efs-assets-githubsourcefeederprops"></a>






Name | Type | Description 
-----|------|-------------
**efsAccessPoint** | <code>[AccessPoint](#aws-cdk-aws-efs-accesspoint)</code> | The target Amazon EFS filesystem to clone the github repository to.
**efsSecurityGroup** | <code>Array<[ISecurityGroup](#aws-cdk-aws-ec2-isecuritygroup)></code> | The security group of the Amaozn EFS.
**repository** | <code>string</code> | The github repository HTTP URI.
**vpc** | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | The VPC of the Amazon EFS Filesystem.
**secretToken**? | <code>[SecretValue](#aws-cdk-core-secretvalue)</code> | The github personal access token(PAT) value from secrets manager.<br/>__*Optional*__



