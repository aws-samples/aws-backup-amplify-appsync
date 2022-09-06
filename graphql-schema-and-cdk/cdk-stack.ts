import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import * as backup from '@aws-cdk/aws-backup';
import * as kms from '@aws-cdk/aws-kms';
import * as iam from '@aws-cdk/aws-iam';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });

    const cdkKeyAdmin = iam.User.fromUserName(this, 'cdkKeyAdmin', 'YOUR_AMPLIFY_USERNAME') // replace with your username
    const keyAdmin1 = iam.User.fromUserName(this, 'keyAdmin1', 'BackupAdmin1')
    const key = new kms.Key(this, `amplify-appsync-${AmplifyHelpers.getProjectInfo().envName}-key`, {
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      alias: `alias/amplify-appsync-${AmplifyHelpers.getProjectInfo().envName}-key`,
      description: 'KMS key for encrypting the objects in your AWS Backup Vault',
      enableKeyRotation: false,
      admins: [cdkKeyAdmin, keyAdmin1]
    });

    const plan = new backup.BackupPlan(this,
      "amplify-appsync-dyanmodb-plan",
      {
        backupPlanName: `amplify-appsync-dyanmodb-plan-${cdk.Fn.ref('env')}`,
        backupPlanRules: [
          backup.BackupPlanRule.daily(),
          backup.BackupPlanRule.weekly(),
          backup.BackupPlanRule.monthly1Year()
        ],
        backupVault: new backup.BackupVault(this, 'Vault', {
          backupVaultName: `amplify-appsync-dyanmodb-valut${AmplifyHelpers.getProjectInfo().envName}`,
          encryptionKey: key,
          accessPolicy: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.DENY,
                principals: [new iam.AnyPrincipal()],
                actions: ['backup:DeleteRecoveryPoint'],
                resources: ['*'],
                conditions: {
                  StringNotLike: {
                    'aws:username': [
                      'BackupAdmin1',
                    ],
                  },
                },
              }),
            ],
          }),
        })
      }
    );

    plan.addSelection(`UserStackSelectionByTag`, { resources: [backup.BackupResource.fromTag('user:Stack', cdk.Fn.ref('env'))] });
  }
}
