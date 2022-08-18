/* eslint-disable @typescript-eslint/no-unused-vars */
import * as cdk from 'aws-cdk-lib'

import {
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy,
  aws_cloudfront as cloudfront
} from 'aws-cdk-lib'

export class CdkStack extends cdk.Stack {
  constructor (scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // S3
    const bucket = new s3.Bucket(this, 'vite-react-bucket', {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html'
    })

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, 'vite-react-deploy', {
      sources: [s3Deploy.Source.asset('../app/dist')],
      destinationBucket: bucket
    })

    // Cloudfront
    const cf = new cloudfront.CloudFrontWebDistribution(this, 'vite-react-distribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ]
    })
  }
}
