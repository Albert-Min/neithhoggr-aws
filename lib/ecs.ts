import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import { Construct } from 'constructs';
import {
  ECS_CLUSTER_AUTO_SCALING_GROUP_NAME,
  ECS_CLUSTER_NAME,
  VPC_NAME,
} from './constants';

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC with isolated subnets
    const vpc = new ec2.Vpc(this, VPC_NAME, {
      maxAzs: 2, // Default is all AZs in the region
    });

    const asg = new autoscaling.AutoScalingGroup(
      this,
      ECS_CLUSTER_AUTO_SCALING_GROUP_NAME,
      {
        instanceType: ec2.InstanceType.of(
          ec2.InstanceClass.T2,
          ec2.InstanceSize.XLARGE,
        ),
        machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
        desiredCapacity: 3,
        vpc,
      },
    );

    const cluster = new ecs.Cluster(this, ECS_CLUSTER_NAME, { vpc });
    const capacityProvider = new ecs.AsgCapacityProvider(
      this,
      'AsgCapacityProvider',
      { autoScalingGroup: asg },
    );
    cluster.addAsgCapacityProvider(capacityProvider);
  }
}
