const AWS = require('aws-sdk');
const fs = require('fs');
const CredentialFormatterV1 = require('../services/credential_formatters/CredentialFormatterV1');
const CredentialFormatterV2 = require('../services/credential_formatters/CredentialFormatterV2');

function awsConfig() {
  AWS.config.update({
    accessKeyId: process.env.VR_S3_KEY,
    secretAccessKey: process.env.VR_S3_SECRET,
    region: process.env.VR_S3_REGION
  });
}

async function sendImage(path) {
  return new Promise((resolve, reject) => {
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: new Buffer(fs.readFileSync(path), 'base64')
      }
    };
    rekognition.detectText(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function detectLabels(path) {
  return new Promise((resolve, reject) => {
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: new Buffer(fs.readFileSync(path), 'base64')
      }
    };
    rekognition.detectLabels(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function detectFaces(path) {
  return new Promise((resolve, reject) => {
    var rekognition = new AWS.Rekognition();
    var params = {
      Image: {
        Bytes: new Buffer(fs.readFileSync(path), 'base64')
      }
    };
    rekognition.detectFaces(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

const TextRecognitionController = {
  analyze: async function(ctx, next) {
    awsConfig();
    const imagePath = ctx.request.files.image.path;
    try {
      //ctx.body = await sendImage(imagePath);
      const rekognitionResponse = await sendImage(imagePath);
      //TextRecognitionFormatter.formatResponse(rekognitionResponse);
      //ctx.body = rekognitionResponse;
      let formatter =
        ctx.request.body.format === 'V1'
          ? CredentialFormatterV1
          : CredentialFormatterV2;
      ctx.body = {
        data: formatter.formatResponse(rekognitionResponse)
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = error.stack;
    }
  },
  detectLabels: async function(ctx, next) {
    awsConfig();
    const imagePath = ctx.request.files.image.path;
    try {
      ctx.body = await detectLabels(imagePath);
    } catch (error) {
      ctx.status = 400;
      ctx.body = error.stack;
    }
  },
  detectFaces: async function(ctx, next) {
    awsConfig();
    const imagePath = ctx.request.files.image.path;
    try {
      ctx.body = await detectFaces(imagePath);
    } catch (error) {
      ctx.status = 400;
      ctx.body = error.stack;
    }
  }
};

module.exports = TextRecognitionController;
