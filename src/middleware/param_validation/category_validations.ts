import * as Joi from 'joi';
import CategorySchemas from '../../validation_schemas/category_schemas';

const CreateCategoryValidation = async function(ctx, next) {
  const { error } = Joi.validate(ctx.request.body, CategorySchemas.create);
  if (error) {
    ctx.status = 400;
    ctx.body = error;
  } else await next();
};

const UpdateCategoryValidation = async function(ctx, next) {
  const { error } = Joi.validate(ctx.request.body, CategorySchemas.update);
  if (error) {
    ctx.status = 400;
    ctx.body = error;
  } else await next();
};

const CategoryValidations = {
  CreateCategoryValidation: CreateCategoryValidation,
  UpdateCategoryValidation: UpdateCategoryValidation
};

export default CategoryValidations;
