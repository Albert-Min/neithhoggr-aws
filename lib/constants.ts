import { ECRRepo } from './type';

export const DEFAULT_MAX_ECR_IMAGE_COUNT = 100;

export const ECR_REPOS: ECRRepo[] = [{ name: 'neithhoggr-openai-api' }];

export const ECS_CLUSTER_NAME = 'ecs-cluster-neithhoggr';
