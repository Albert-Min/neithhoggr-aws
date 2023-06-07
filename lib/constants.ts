import { ERCRepo } from './type';

export const DEFAULT_MAX_ECR_IMAGE_COUNT = 100;

export const ECR_REPOS: ERCRepo[] = [{ name: 'neithhoggr-openai-api' }];

export const ECS_CLUSTER_NAME = 'ecs-cluster-neithhoggr';

export const ECS_TASK_EXECUTION_ROLE = 'role-ecs-task-neithhoggr';
