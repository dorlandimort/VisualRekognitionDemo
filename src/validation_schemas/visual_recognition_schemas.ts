import * as Joi from 'joi';

const classify = {
  image: Joi.any().required()
};

const VisualRecognitionSchemas = {
  classify: classify
};

export default VisualRecognitionSchemas;
