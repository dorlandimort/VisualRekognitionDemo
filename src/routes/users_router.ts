import UsersController from '../controllers/users_controller';
import * as Router from 'koa-router';
import JWTAuthourize from '../middleware/jwt_authorize';
import UserValidations from '../middleware/param_validation/user_validations';

const usersRouter = new Router({ prefix: '/users' });

usersRouter.get('/', JWTAuthourize, async (ctx, next) => {
  return UsersController.index(ctx);
});

usersRouter.post(
  '/',
  UserValidations.CreateUserValidation,
  async (ctx, next) => {
    return UsersController.create(ctx);
  }
);

usersRouter.post('/authenticate', async (ctx, next) => {
  return UsersController.authenticate(ctx);
});

usersRouter.get('/:id', JWTAuthourize, async (ctx, next) => {
  return UsersController.show(ctx);
});

usersRouter.delete('/:id', JWTAuthourize, async (ctx, next) => {
  return UsersController.destroy(ctx);
});

usersRouter.put('/:id/requests_limit', JWTAuthourize, async (ctx, next) => {
  return UsersController.updateRequestsLimit(ctx);
});

export default usersRouter;
