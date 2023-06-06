import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';

export class EcsClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 3, // Default is all AZs in the region
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: vpc,
    });

    // Add capacity (an Auto Scaling group) to the ECS cluster
    cluster.addCapacity('MyAutoScalingGroup', {
      instanceType: new ec2.InstanceType('t2.micro'),
      desiredCapacity: 3,
      // other Auto Scaling group properties...
    });
  }
}
