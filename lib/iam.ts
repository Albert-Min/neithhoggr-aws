import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { ECS_TASK_EXECUTION_ROLE } from './constants';

export class IAMStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Create a new IAM role for ECS tasks
    const ecsTaskExecutionRole = new iam.Role(this, 'ECSTaskExecutionRole', {
      roleName: ECS_TASK_EXECUTION_ROLE, // specify the role name here
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
    });

    // Attach the necessary policies to the role
    ecsTaskExecutionRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'service-role/AmazonECSTaskExecutionRolePolicy',
      ),
    );
  }
}
