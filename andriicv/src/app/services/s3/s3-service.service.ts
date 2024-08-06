import { S3Client, GetObjectCommand, ListObjectsCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, from } from 'rxjs';

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

   readJsonFile(path: string, fileName: string): Observable<any> {
    const command = new GetObjectCommand({ Bucket: this.bucketName, Key: path + fileName  }); //'data/main_blocks.json'
    const promise = this.s3Client.send(command)
      .then((data: GetObjectCommandOutput) => {
        if (!data.Body) {
          throw new Error('No data found in S3 object');
        }
        return this.streamToString(data.Body as ReadableStream | Blob | Buffer);
      })
      .then((bodyContents: string) => JSON.parse(bodyContents))
      .catch((err: Error) => {
        console.error('Error reading JSON file from S3', err);
        throw err;
      });

    return from(promise);
  }

  async streamToString(stream: ReadableStream | Blob | Buffer): Promise<string> {
    if (stream instanceof ReadableStream) {
      const reader = stream.getReader();
      const decoder = new TextDecoder('utf-8');
      let result = '';
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          result += decoder.decode(value, { stream: !done });
        }
      }

      return result;
    } else if (stream instanceof Blob) {
      return stream.text();
    } else if (Buffer.isBuffer(stream)) {
      return stream.toString('utf-8');
    } else {
      throw new Error('Unsupported stream type');
    }
  }
}