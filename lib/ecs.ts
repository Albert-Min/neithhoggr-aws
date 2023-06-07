import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import {
  ECS_CLUSTER_NAME,
  ECS_SERVICE_OPENAI_API_NAME,
  ECS_TASK_NODE_FAMILY_NAME,
} from './constants';
import { getECSExecutionRole } from './iams/getECSRoles';

export class EcsClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 3, // Default is all AZs in the region
    });

    const loadbalancer = new ApplicationLoadBalancer(this, 'lb', {
      vpc,
      internetFacing: true,
      vpcSubnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC,
      }),
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: vpc,
      clusterName: ECS_CLUSTER_NAME,
    });

    const executionRole = getECSExecutionRole(this);

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      'FargateNodeService',
      {
        cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'),
          containerName: 'app',
          family: ECS_TASK_NODE_FAMILY_NAME,
          containerPort: 3000,
          executionRole,
        },
        cpu: 256,
        memoryLimitMiB: 512,
        desiredCount: 2,
        serviceName: ECS_SERVICE_OPENAI_API_NAME,
        taskSubnets: vpc.selectSubnets({
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        }),
        loadBalancer: loadbalancer,
      },
    );

    // Enable Fargate capacity providers
    cluster.enableFargateCapacityProviders();
  }
}
