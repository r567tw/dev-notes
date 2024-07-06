---
title: AWS
sidebar_position: 999
---
<!-- 可以和 AWS Step Function 一起結合 -->

# EC2
## How to deploy laravel project to ec2

### Pre-requirement
```bash
apt-get update && apt-get upgrade
apt-get install nginx
apt-get install php
apt-get install php-mysql
apt-get install php-mysql php-fpm php-xml php-gd php-opcache php-mbstring
apt-get install php-curl
apt-get install php-sqlite3
apt-get install composer
```
### In Laravel Project Foder
```bash
#! Ready Laravel App (git clone or ftp upload...etc)
$ chown -R www-data:www-data ./
$ chmod -R 775 ./
$ cd /etc/nginx/sites-available
$ vim laravelapp.conf
$ ln -s  /etc/nginx/sites-available/laravelapp.conf /etc/nginx/sites-enabled
```

```conf title="laravelapp.conf"
server {
    listen 80 default_server;
    listen [::]:80 default_server;
 
    root /var/www/html/open-course/public;

    index index.php index.html;
 
    server_name _;
 
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
 
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;

        # With php-fpm (or other unix sockets);
        fastcgi_pass unix:/var/run/php/php-fpm.sock;
        # With php-fpm (or other unix sockets);
    }
}

```

### Nginx Command
```bash
#! command about nginx command 
$ sudo service nginx start/stop/restart
#! test nginx configuration command
$ nginx -t
```

### REF
https://www.clickittech.com/tutorial/deploy-laravel-on-aws-ec2/

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

# Step Function
之前工作用到一些工具，使用到AWS step function , 因此在這裡也筆記一下...
也在公司後端組例會分享了一下（以下就是我分享的PPT ）：

<!-- <https://www.slideshare.net/ssusereb2ee2/aws-stepfunction> -->

其實我覺得我用的情境很簡單，只是用Map 的方式啟動lambda . 這個 lambda 就是我用來處理下載與上傳到s3指定位置... 說真的應用的情境真的很不多... 還有更多著墨的空間。

另外，自己同時也針對此寫了兩個版本，用SAM 和 用 CDK 的版本...

一、CDK 的版本
```typescript
import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda"
import * as stepfunctions from "@aws-cdk/aws-stepfunctions"
import * as tasks from "@aws-cdk/aws-stepfunctions-tasks"
import * as logs from "@aws-cdk/aws-logs"
import * as s3 from "@aws-cdk/aws-s3"
import * as ec2 from "@aws-cdk/aws-ec2"
import * as dotenv from 'dotenv';

export class CdkLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 將裡面比較敏感的資訊用env 包起來, 注意後面的path 要正確
    dotenv.config({path:__dirname+'/../.env'})
    
    // 我要上傳音檔的S3 目標 arn:aws:s3:::test 為虛構（我忘了把這個也包env了哈哈）
    const bucket = s3.Bucket.fromBucketArn(this,"test","arn:aws:s3:::test")

    // 負責前面呼叫step function 的 lambda
    const downloadAudioLambda = new lambda.Function(this, "downloadAudioLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      timeout: cdk.Duration.seconds(25),
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/downloadAudioLambda")
    });

    bucket.grantPut(downloadAudioLambda)

    const downloadAudioJob = new tasks.LambdaInvoke(this,'Calllambda',{
      lambdaFunction: downloadAudioLambda,
      outputPath: "$.Payload"
    })

    const map = new stepfunctions.Map(this, 'ExampleMapState');
    map.iterator(downloadAudioJob);

    const logGroup = new logs.LogGroup(this, 'StepFunctionLogs')

    const stateMachine = new stepfunctions.StateMachine(this, 'StateMachine', {
        definition: map,
        logs: {
          destination: logGroup,
          level: stepfunctions.LogLevel.ERROR
        }
    });

    const testVpc = ec2.Vpc.fromLookup(this,"vpc-dev",{
      vpcId: process.env.VPCID
    });

    const processorLambda = new lambda.Function(this, "processorLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.handler",
      timeout: cdk.Duration.seconds(25),
      code: lambda.Code.fromAsset("lambda/processor"),
      vpc: testVpc,
      environment: {
        ENDPOINT: process.env.ENDPOINT ?? 'localhost',
        DATABASE: process.env.DATABASE ?? 'db',
        DBUSERNAME: process.env.DBUSERNAME ?? 'root',
        PASSWORD: process.env.PASSWORD ?? 'password',
        NODE_ENV: process.env.NODE_ENV ?? 'test',
        statemachine_arn: stateMachine.stateMachineArn
      }
    });

    stateMachine.grantStartExecution(transferLambda)
  }
}
```
總之，上面我就是用CDK先創建我的lambda , 然後把那個要放到state machine 的建立"task", 給予我另外一個lambda 有 startExecution 的權限.... 簡單完成！

二、SAM 的版本

總之，有些原因，我另外又學習怎麼用SAM製作 state machine XDD
```yaml
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description:
  download audio file from huaxi to trigger audio transcoder
Resources:
  ProcessAudioFileStateMachine:
    Type: AWS::Serverless::StateMachine # More info about State Machine Resource: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-statemachine.html
    Properties:
      DefinitionUri: statemachine/audioFile_processer.json
      DefinitionSubstitutions:
        DownloadAudioFunctionArn: !GetAtt DownloadAudioFunction.Arn
      Policies: # Find out more about SAM policy templates: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html
        - LambdaInvokePolicy:
            FunctionName: !Ref DownloadAudioFunction

  DownloadAudioFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html
    Properties:
      FunctionName: downloadaudio
      CodeUri: functions/downloadaudio/
      Handler: index.handler
      Runtime: nodejs12.x
      Timeout: 20
      Policies:
        - S3ReadPolicy:
            BucketName: 'test'
        - S3WritePolicy:
            BucketName: 'test'

  ProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: processor
      Timeout: 20
      CodeUri: functions/processor/
      Handler: index.handler
      Runtime: nodejs12.x
      Environment:
        Variables:
          DATABASE: dbname
          DBUSERNAME: dbusername
          PASSWORD:dbpassword
          NODE_ENV: test
          statemachine_arn: !Ref ProcessAudioFileStateMachine
      Policies:
        - StepFunctionsExecutionPolicy:
            StateMachineName: !GetAtt ProcessAudioFileStateMachine.Name
```
其實說真的CDK 和 SAM 沒有多大差別，只是CDK你可以用比較程式化的去做那個state machine language （就是sam 裡面要包的那個json 啦！），像我，實在懶得去構想那個json 怎麼寫（啊我就不是JSON工程師啊～），所以先用CDK 產生state machine , 然後上AWS控制台上面把那一串json 抓下來，放到我的sam 這裏... 整理一下，CDK detroy 一下，sam 的template.yaml 調整一下，一個下午搞定啦！（不過我好像忘了在sam 裡面宣吿log 去接state machine 啦 XDDD 之後再研究吧！）

> 小君曰：還有很多成長的空間