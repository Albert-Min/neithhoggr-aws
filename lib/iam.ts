import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { ECS_TASK_EXECUTION_ROLE_NAME, ECS_TASK_ROLE_NAME } from './constants';

export class IAMStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    /*
    This role is used by the ECS agent to make AWS API calls on your behalf.
    The agent needs this role to pull container images, publish container logs to CloudWatch Logs,
    and so on.
    */
    const ecsTaskExecutionRole = new iam.Role(this, 'ECSTaskExecutionRole', {
      roleName: ECS_TASK_EXECUTION_ROLE_NAME, // specify the role name here
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    // Attach the necessary policies to the role
    ecsTaskExecutionRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AmazonECSTaskExecutionRolePolicy',
      ),
    );

    // Add permissions to create log streams and put log events
    ecsTaskExecutionRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
        resources: ['arn:aws:logs:*:*:*'],
      }),
    );

    /*
    The ECS task role: This role is used by the task itself.
    If your task needs to interact with other AWS services
    (like reading a file from an S3 bucket or writing data to a DynamoDB table)
    */

    const ecsTaskRole = new iam.Role(this, 'ECSTaskRole', {
      roleName: ECS_TASK_ROLE_NAME,
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    // Add any necessary permissions to the task role here
    // For example, to allow the task to read from an S3 bucket:
    // ecsTaskRole.addToPolicy(
    //   new iam.PolicyStatement({
    //     actions: ['s3:GetObject'],
    //     resources: ['arn:aws:s3:::my-bucket/*'],
    //   })
    // );
  }
}
