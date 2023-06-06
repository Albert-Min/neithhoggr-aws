import { ERCRepo } from './type';

export const DEFAULT_MAX_ECR_IMAGE_COUNT = 100;

export const ECR_REPOS: ERCRepo[] = [{ name: 'neithhoggr-openai-api' }];

export const ECS_CLUSTER_NAME = 'ecs-neithhoggr';

export const ECS_CLUSTER_AUTO_SCALING_GROUP_NAME = 'ecs-neithhoggr-asg';

export const VPC_NAME = 'vpc-neithhoggr';
