import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import { Construct } from 'constructs';
import { ECS_CLUSTER_NAME } from './constants';

export class EcsClusterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 3, // Default is all AZs in the region
    });

    const asg = new autoscaling.AutoScalingGroup(this, 'ASG', {
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
      desiredCapacity: 3,
      vpc,
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: vpc,
      clusterName: ECS_CLUSTER_NAME,
    });

    // Add capacity provider to the ECS cluster
    const capacityProvider = new ecs.AsgCapacityProvider(
      this,
      'AsgCapacityProvider',
      { autoScalingGroup: asg },
    );
    cluster.addAsgCapacityProvider(capacityProvider);
  }
}
