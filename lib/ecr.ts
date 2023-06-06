import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import { DEFAULT_MAX_ECR_IMAGE_COUNT, ECR_REPOS } from './constants';

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
            maxImageCount: it.maxImageCount || DEFAULT_MAX_ECR_IMAGE_COUNT,
            tagStatus: ecr.TagStatus.ANY,
          },
        ],
      });
    });
  }
}
