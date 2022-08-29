# aws-backup-amplify-appsync

AWS Amplify makes it easy to build full stack front end UI apps with backends and authentication. AWS AppSync adds serverless GraphQL and DynamoDB tables to your application with no code. This project guides you on how to include the infrastructure as code to add AWS Backup to an Amplify and AppSync application using to manage snapshots for your applications DynamoDB tables. 

See the following Architecture Diagram detailing what this sample solution will deploy.

![Architecture diagram](/public/AwsBackupAmplifyAppsync.png)


## Prerequisites

To work with this project first be sure you are familiar with [AWS Amplify](https://aws.amazon.com/amplify/), [VueJS 3](https://vuejs.org/), [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) and [AWS AppSync](https://aws.amazon.com/appsync/). It is helpful to also understand [AWS Backup](https://aws.amazon.com/backup/)


## Project setup


You will need to clone the repository for this project, move into project the directory and configure Amplify after you've installed the required CLI tooling. See the AWS Amplify Vue [ Getting Started](https://docs.amplify.aws/start/getting-started/installation/q/integration/vue/) Prerequisites section to understand how to setup your CLI environment and assign an IAM user. Your Amplify IAM user needs to have permissions policies that allow you to create Amplify applications and AWS Backup artifacts. To keep things simple you can add the AWS managed policies "AdministratorAccess-Amplify" and "AWSBackupFullAccess". For any real world deployments you will want to be more prescriptive and apply the principle of least privilege. 

Run the following commands to get started once your CLI is ready:

```
git clone git@ssh.gitlab.aws.dev:kschwa/aws-backup-amplify-appsync.git
cd aws-backup-amplify-appsync
amplify configure
```

Now you can initialize your Amplify environment - run `amplify init` in your terminal. Answer the following questions when prompted:

1. Enter a name for the project *awsbackupamplifyapps*
1. Initialize the project with the above configuration? *Yes*
1. Select the authentication method you want to use: (Use arrow keys) *AWS profile*
1. Please choose the profile you want to use (Use arrow keys) *Select the profile you setup when you ran Amplify configure*

Amplify will initialize your backend and create local resources in your project accordingly. 

Next lets install dependencies by running `npm install`. You are now ready to build Amplify Authentication with Cognito and add an AppSync API. Note that the code in this repo for the API is already built into the Vue application so we won't run the server until we add these resources.

Run `amplify add auth` and accept all the defaults. Then run `amplify push` to create your Cognito user pool in the cloud. 
Now run `amplify add api` and choose *GraphQL* for the service. When presented with the GraphQL API create settings choose *Continue* followed by *Blank Schema*. When you are asked to edit the schema now, input *no*. Before we push this API to the cloud we are going to adjust the codegen depth for generated javascript queries. In your terminal input `amplify configure codegen` and choose *javascript*. Accept the default file name pattern and *Yes* to generation of all GraphQL operations. For maximum statement input *4*. Finally we need to updated your schema. Run the following commands and accepts the *Y* default for all GraphQL setting confirmations. 

```
cp graphql-schema/schema.graphql amplify/backend/api/awsbackupamplifyapps/schema.graphql
amplify push
```

Once the push completes run `npm run serve`. You'll be presented with a Cognito login prompt for your application. Create a new user, confirm it, and login. Now you can create some data in your DynamoDB tables over GraphQL APIs. TODO

Next add a custom resource TODO. Tomorrow you'll see backups in the vault. 

## Cleanup

To avoid accruing costs associated with this guide, you can remove your Amplify application and all associated resources by running `amplify delete`.


