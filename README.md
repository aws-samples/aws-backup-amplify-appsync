# aws-backup-amplify-appsync

AWS Amplify makes it easy to build full stack front end UI apps with backends and authentication. AWS AppSync adds serverless GraphQL and DynamoDB tables to your application with no code. This project guides you on how to include the infrastructure as code to add AWS Backup to an Amplify and AppSync application using to manage snapshots for your applications DynamoDB tables. 

See the following Architecture Diagram detailing what this sample solution will deploy.

![Architecture diagram](/public/AwsBackupAmplifyAppsync.png)


## Prerequisites

To work with this project first be sure you are familiar with [AWS Amplify](https://aws.amazon.com/amplify/), [VueJS 3](https://vuejs.org/), [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) and [AWS AppSync](https://aws.amazon.com/appsync/). It is helpful to also understand [AWS Backup](https://aws.amazon.com/backup/)


## Project setup

Detailed instructions will be available in the upcoming blog which will be linked here as soon as it is published. 


You will need to clone the repository for this project, move into project the directory and initialize Amplify after you've installed the required CLI tooling. See the AWS Amplify Vue [ Getting Started](https://docs.amplify.aws/start/getting-started/installation/q/integration/vue/) Prerequisites section to understand how to setup your CLI environment. Your Amplify IAM principle needs to have permissions policies that allow you to create Amplify applications and AWS Backup artifacts. To keep things simple you can add the AWS managed policies "AdministratorAccess-Amplify", "AWSKeyManagementServicePowerUser", and "AWSBackupFullAccess".  You'll be setting up a custom KMS Customer Managed key which will require you to also add an inline policy to your user (my user name is amplify-backup).

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "iam:PutUserPolicy",
                "iam:DeleteUserPolicy"
            ],
            "Resource": "arn:aws:iam::101453934597:user/amplify-backup"
        }
    ]
}
```

To get started run the commands below and choose the appropriate AWS profile when prompted.

```
git clone git@github.com:aws-samples/aws-backup-amplify-appsync.git
cd aws-backup-amplify-appsync
amplify init
```

Amplify will initialize your backend and create local resources in your project accordingly. 

Next install dependencies by running `npm install`. You are now ready to build Amplify Authentication with Cognito and add an AppSync API. Note that the code in this repo for the API is already built into the Vue application so we won't run the server until we add these resources.

Run `amplify add auth` and accept all the defaults. Then follow the steps below to answer your prompts.

1)	Do you want to use the default authentication and security configuration? (Use arrow keys): Manual configuration
2)	Select the authentication/authorization services that you want to use: User Sign-Up & Sign-In only (Best used with a cloud API only)
3)	Provide a friendly name for your resource that will be used to label this category in the project: Accept suggested value
4)	Provide a name for your user pool: Accept suggested value
5)	How do you want users to be able to sign in? (Use arrow keys): Username
6)	Do you want to add User Pool Groups? (Use arrow keys): No
7)	Do you want to add an admin queries API? (Use arrow keys): No
8)	Multifactor authentication (MFA) user login options: (Use arrow keys): OFF
9)	Email based user registration/forgot password: (Use arrow keys): Enabled (Requires per-user email entry at registration)
10)	Specify an email verification subject: Accept suggested value
11)	Specify an email verification message: Accept suggested value
12)	Do you want to override the default password policy for this User Pool? N
13)	What attributes are required for signing up? Email
14)	Specify the app's refresh token expiration period (in days): 2
15)	Do you want to specify the user attributes this app can read and write? N
16)	Do you want to enable any of the following capabilities? Don’t select anything, press Enter
17)	Do you want to use an OAuth flow? No
18)	Do you want to configure Lambda Triggers for Cognito? N

Now run amplify push to create your Cognito user pool in the cloud. This will enable self-sign-up. Next run `amplify add api` and use the following inputs at the prompts.

1)	Select from one of the below mentioned services: (Use arrow keys) GraphQL
2)	Here is the GraphQL API that we will create. Select a setting to edit or continue: Authorization modes
3)	Choose the default authorization type for the API: Amazon Cognito User Pool
4)	Configure additional auth types? N
5)	Continue
6)	Choose a schema template: (Use arrow keys) Blank Schema
7)	Do you want to edit the schema now? N

Before you push this API to the cloud you need to adjust the query depth for generated JavaScript queries. In your terminal input amplify configure codegen 

•	Choose the code generation language target (Use arrow keys) JavaScript
•	Enter the file name pattern of graphql queries, mutations and subscriptions: Accept the default value
•	Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions: Y
•	Enter maximum statement depth [increase from default if your schema is deeply nested]: 4

Finally, you need to update your schema with a predefined schema I’ve supplied for this application. Run the following block of commands into your terminal  to copy the prepared schema.graphql file into your project and create APIs in the cloud.

cp graphql-schema-and-cdk/schema.graphql amplify/backend/api/awsbackupamplifyapps/schema.graphql
amplify push

When prompted, accept the default for all GraphQL settings confirm Yes


Once the push completes run `npm run serve`. You'll be presented with a Cognito login prompt for your application. Create a new user, confirm it, and login. Now you can create some data in your DynamoDB tables over GraphQL APIs. I setup a category for "Mythical Beasts" and added the items "Minotaur", "Cyclops", "Ogre", "Unicorn" and another category for "Programming Languages" and added the items "Java", "Python", "Ruby", "JavaScript"

At this point we've leveraged Amplify and AppSync to quickly create a secure and scaleable application in the AWS cloud. However, without backups this application lacks the Failure Management component of the Well Architected Framework because it doesn't have backups configured. We'll use Amplify Custom Resources with CDK to configure AWS Backup.

Stop your web server if it is still running, then in your terminal enter `amplify add custom` and choose AWS CDK. Enter the custom resource name *backups*. Amplify will ask if you want to edit the stack now, press `Enter`. Next we'll update our CDK stack with one prepared for backups and push our changes to the cloud.

```
cp graphql-schema-and-cdk/cdk-stack.ts amplify/backend/custom/backups/cdk-stack.ts
cp graphql-schema-and-cdk/package.json amplify/backend/custom/backups/package.json
```

Now open the file cdk-stack.ts in your edit and review the line `const keyAdmin = iam.User.fromUserName(this, "keyAdmin", "amplify-backup");`. You'll need to change the current username **amplify-backup** to match the iam User name of your user, or follow the instructions in the comments for a role based approach if you're using SSO.

After the push command completes run npm run serve in your terminal. One the application is up and running navigate your browser to http://localhost:8080/. You'll be presented with a Cognito login prompt for your application. Navigate to the Create a new user, confirm it, and login. 

Now you can create some data in your DynamoDB tables over GraphQL APIs. I setup a category for "Mythical Beasts" and added the items "Minotaur", "Cyclops", "Ogre", "Unicorn" and another category for "Programming Languages" and added the items "Java", "Python", "Ruby", "JavaScript"

 You can leave this application running overnight to see the daily backups show up in your AWS Backup Vault. 

## Cleanup

To avoid accruing costs associated with this guide, you can remove your Amplify application and all associated resources by running `amplify delete`. Note that the AWS Backup vault and restore points will not be deleted automatically so you will need to delete those manually if you'd like to remove those. 


