import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import { ECS_CLUSTER_NAME, VPC_NAME } from './constants';

export class EcsClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, VPC_NAME, {
      maxAzs: 3, // Default is all AZs in the region
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, ECS_CLUSTER_NAME, {
      vpc: vpc,
    });

    // Add capacity to it
    cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
      instanceType: new ec2.InstanceType('t2.micro'),
      desiredCapacity: 1,
    });
  }
}
