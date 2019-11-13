const TextRecognitionController = require('../controllers/text_recognition_controller');
const Router = require('koa-router');

const TextRecognitionRouter = new Router({ prefix: '/text_recognition' });

TextRecognitionRouter.post('/analyze', async (ctx, next) => {
  await TextRecognitionController.analyze(ctx, next);
});

TextRecognitionRouter.post('/detect_labels', async (ctx, next) => {
  await TextRecognitionController.detectLabels(ctx, next);
});

TextRecognitionRouter.post('/detect_faces', async (ctx, next) => {
  await TextRecognitionController.detectFaces(ctx, next);
});

module.exports = TextRecognitionRouter;
