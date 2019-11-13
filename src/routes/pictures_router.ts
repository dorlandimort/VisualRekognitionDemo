import PicturesController from '../controllers/pictures_controller';
import * as Router from 'koa-router';
import JWTAuthourize from '../middleware/jwt_authorize';

const picturesRouter = new Router({ prefix: '/products/:product_id/pictures' });

picturesRouter.get('/', JWTAuthourize, async (ctx, next) => {
  return PicturesController.index(ctx);
});

picturesRouter.post('/', JWTAuthourize, async (ctx, next) => {
  return PicturesController.create(ctx);
});

picturesRouter.get('/:id', JWTAuthourize, async (ctx, next) => {
  return PicturesController.show(ctx);
});

picturesRouter.put('/:id', JWTAuthourize, async (ctx, next) => {
  return PicturesController.update(ctx);
});

picturesRouter.delete('/:id', JWTAuthourize, async (ctx, next) => {
  return PicturesController.destroy(ctx);
});

export default picturesRouter;
