import { S3Client, GetObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {
  
  private s3Client: any;
  private bucketName = 'andriicv-bucket';
  private region = 'us-east-1';

  constructor() {
    this.initializeClient();
  }

  private async initializeClient() {
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey
      }
    });
  }

  async listFiles() {
    const command = new ListObjectsCommand({ Bucket: this.bucketName });
    try {
      const data = await this.s3Client.send(command);
      return data.Contents;
    } catch (err) {
      console.error('Error listing files from S3', err);
      throw err;
    }
  }

  async readJsonFile() {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: 'data/main_blocks.json' });
    try {
      const data = await this.s3Client.send(command);
      if (!data.Body) {
        throw new Error('No data found in S3 object');
      }
      const bodyContents = await this.streamToString(data.Body);
      return JSON.parse(bodyContents);
    } catch (err) {
      console.error('Error reading JSON file from S3', err);
      throw err;
    }
  }

  private async streamToString(stream: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
  }
}