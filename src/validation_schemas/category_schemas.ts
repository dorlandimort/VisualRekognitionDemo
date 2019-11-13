import * as Joi from 'joi';

const create = {
  name: Joi.string()
    .max(140)
    .required(),
  description: Joi.string().max(1500),
  slug: Joi.string()
    .max(140)
    .required()
};

const update = {
  name: Joi.string().max(140),
  description: Joi.string().max(1500),
  slug: Joi.string().max(140)
};

const CategorySchemas = {
  create: create,
  update: update
};

export default CategorySchemas;
