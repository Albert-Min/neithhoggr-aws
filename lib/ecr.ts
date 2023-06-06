import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

interface ERCRepo {
  name: string;
  maxImageCount?: number;
}

export const DEFAULT_MAX_IMAGE_COUNT = 100;

export const ECR_REPOS: ERCRepo[] = [{ name: 'neithhoggr-openai-api' }];

export class EcrStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    ECR_REPOS.forEach((it) => {
      new ecr.Repository(this, it.name, {
        repositoryName: it.name,
        lifecycleRules: [
          {
            rulePriority: 1,
            description: 'Keep last 100 images',
            maxImageCount: it.maxImageCount || DEFAULT_MAX_IMAGE_COUNT,
            tagStatus: ecr.TagStatus.ANY,
          },
        ],
      });
    });
  }
}
