import ProductsController from '../controllers/products_controller';
import * as Router from 'koa-router';
import JWTAuthourize from '../middleware/jwt_authorize';

export const productsRouter = new Router({ prefix: '/products' });

productsRouter.get('/', JWTAuthourize, async (ctx, next) => {
  return ProductsController.index(ctx);
});

productsRouter.get(
  '/category/:category_id',
  JWTAuthourize,
  async (ctx, next) => {
    return ProductsController.fromCategory(ctx);
  }
);

productsRouter.get('/:id', JWTAuthourize, async (ctx, next) => {
  return ProductsController.show(ctx);
});
