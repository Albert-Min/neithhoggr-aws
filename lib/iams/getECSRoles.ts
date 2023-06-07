import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export const getECSExecutionRole = (scope: Construct): iam.Role => {
  /*
    This role is used by the ECS agent to make AWS API calls on your behalf.
    The agent needs this role to pull container images, publish container logs to CloudWatch Logs,
    and so on.
    */
  const ecsTaskExecutionRole = new iam.Role(scope, 'ECSTaskExecutionRole', {
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

  return ecsTaskExecutionRole;
};

export const getECSRole = (scope: Construct): iam.Role => {
  /*
    The ECS task role: This role is used by the task itself.
    If your task needs to interact with other AWS services
    (like reading a file from an S3 bucket or writing data to a DynamoDB table)
    */

  const ecsTaskRole = new iam.Role(scope, 'ECSTaskRole', {
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

  return ecsTaskRole;
};
