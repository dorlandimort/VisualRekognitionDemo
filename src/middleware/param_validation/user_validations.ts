import * as Joi from 'joi';
import UserSchemas from '../../validation_schemas/user_schemas';

const CreateUserValidation = async function(ctx, next) {
  const { error } = Joi.validate(ctx.request.body, UserSchemas.create);
  if (error) {
    ctx.status = 400;
    ctx.body = error;
  } else {
    await next();
  }
};

const UserValidations = {
  CreateUserValidation: CreateUserValidation
};

export default UserValidations;
