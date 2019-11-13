import * as Joi from 'joi';
import VisualRecognitionSchemas from '../../validation_schemas/visual_recognition_schemas';

const RequestClassification = async function(ctx, next) {
  const { error } = Joi.validate(
    ctx.request.body,
    VisualRecognitionSchemas.classify
  );
  if (error) {
    ctx.status = 400;
    ctx.body = error;
  } else {
    await next();
  }
};

const VisualRecognitionValidations = {
  RequestClassification: RequestClassification
};

export default VisualRecognitionValidations;
