---
sidebar_position: 2
---
# CDK
## Intro
- `#IaC`
- `#TypeScript` (also use Python,Golang)

## Installation
```bash
$ npm install -g aws-cdk
#! check cdk installation
$ cdk --version 
```
## Pre-requirement
- Ready AWS Account
- Give Right Permission to Account

## Init
```bash
$ cdk bootstraap aws://{account}/{region}
```

## Create CDK Project
```bash
$ cdk init --language typescript
```

- **Key File: `lib/cdk-workshop-stack.ts`**
- For example: create a simple lambda
```typescript title="lib/cdk-workshop-stack.ts"
import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // defines an AWS Lambda resource
    const firstLambda = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,    
      code: lambda.Code.fromAsset('lambda'),  
      handler: 'hello.handler'               
    });
  }
}
```

Create lambda/hello.js
```javascript title="lambda/hello.js"
exports.handler = async function (event) {
    // console.log("request:", JSON.stringify(event, undefined, 2));
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: `Hello, CDK!\n`
    };
};
```

## CDK Command
```bash
#! Deploy
$ cdk deploy
#! Destroy / Delete
$ cdk destroy 
```

## Ref
- https://cdkworkshop.com/