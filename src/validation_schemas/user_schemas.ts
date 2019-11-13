import * as Joi from 'joi';

const create = {
  email: Joi.string()
    .email({ minDomainsAtoms: 2 })
    .max(140)
    .required(),
  password: Joi.string()
    .min(4)
    .max(140)
    .required(),
  first_name: Joi.string()
    .max(140)
    .required(),
  last_name: Joi.string()
    .max(140)
    .required(),
  mother_last_name: Joi.string().max(140),
  allowed_requests_per_day: Joi.number()
    .integer()
    .min(0)
};

const UserSchemas = {
  create: create
};

export default UserSchemas;
