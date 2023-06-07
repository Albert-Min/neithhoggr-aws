import { ERCRepo } from './type';

export const DEFAULT_MAX_ECR_IMAGE_COUNT = 100;

export const ECR_REPOS: ERCRepo[] = [{ name: 'neithhoggr-openai-api' }];

export const ECS_CLUSTER_NAME = 'ecs-cluster-neithhoggr';

export const ECS_SERVICE_OPENAI_API_NAME = 'neithhoggr-openai-api';

export const ECS_TASK_NODE_FAMILY_NAME = 'neithhoggr-node-task-defn';
