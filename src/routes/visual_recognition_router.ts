import * as Router from 'koa-router';
import visualRecognitionController from '../controllers/visual_recognition_controller';
import JWTAuthourize from '../middleware/jwt_authorize';
import LimitRequest from '../middleware/limit_request';
import ValidateVrParams from '../middleware/validate_vr_params';

export const visualRecognitionRouter = new Router({
  prefix: '/visual_recognition'
});

visualRecognitionRouter.post(
  '/search_classification',
  JWTAuthourize,
  LimitRequest,
  ValidateVrParams,
  async (ctx, next) => {
    return visualRecognitionController.getClassification(ctx);
  }
);
