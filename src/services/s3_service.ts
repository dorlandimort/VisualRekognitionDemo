import * as aws from 'aws-sdk';
import * as fs from 'fs';

function configAWS() {
  aws.config.update({
    accessKeyId: process.env.VR_S3_KEY,
    secretAccessKey: process.env.VR_S3_SECRET,
    region: process.env.VR_S3_REGION
  });
}

namespace S3Service {
  export async function uploadFile(fileKey, file) {
    return new Promise<{ key: any; url: any }>((resolve, reject) => {
      configAWS();
      const s3 = new aws.S3();
      const stream = fs.createReadStream(file.path);
      stream.on('error', err => {
        reject(err);
      });

      s3.upload(
        {
          ACL: 'public-read',
          Bucket: process.env.VR_S3_BUCKET_NAME,
          Body: stream,
          Key: fileKey,
          ContentType: file.type
        },
        (err, data) => {
          if (err) reject(err);
          else {
            resolve({ key: data.Key, url: data.Location });
          }
        }
      );
    });
  }
}

export default S3Service;
