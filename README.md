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

Next lets install dependencies by running `npm install` and let's make sure the project runs locally by running `npm run serve`. You should see a default page for a Vue JS 3 application. Stop the server by entering 'command/ctrl + C'.

You are now ready to build Amplify Authentication with Cognito and add an AppSync API. 


## Cleanup

To avoid accruing costs associated with this guide, you can remove your Amplify application and all associated resources by running `amplify delete`.


