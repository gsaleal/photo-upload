import 'dotenv/config';
import AWS from "aws-sdk";

export class S3 {
  async connect() {

    AWS.config.update({
      region: process.env.S3_REGION,
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY
    });

    return new AWS.S3();
  }
}