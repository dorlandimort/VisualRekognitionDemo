import * as Router from 'koa-router';
import CategoriesController from '../controllers/categories_controller';
import ProductsController from '../controllers/products_controller';
import JWTAuthourize from '../middleware/jwt_authorize';
import CategoryValidations from '../middleware/param_validation/category_validations';

const categoriesRouter = new Router({ prefix: '/categories' });

categoriesRouter.get('/', JWTAuthourize, async (ctx, next) => {
  return CategoriesController.index(ctx);
});

categoriesRouter.post(
  '/',
  CategoryValidations.CreateCategoryValidation,
  JWTAuthourize,
  async (ctx, next) => {
    return CategoriesController.create(ctx);
  }
);

categoriesRouter.get('/:id', JWTAuthourize, async (ctx, next) => {
  return CategoriesController.show(ctx);
});

categoriesRouter.put(
  '/:id',
  JWTAuthourize,
  CategoryValidations.UpdateCategoryValidation,
  async (ctx, next) => {
    return CategoriesController.update(ctx);
  }
);

categoriesRouter.delete('/:id', JWTAuthourize, async (ctx, next) => {
  return CategoriesController.destroy(ctx);
});

categoriesRouter.get('/:id/products', JWTAuthourize, async (ctx, next) => {
  return CategoriesController.products(ctx);
});

categoriesRouter.post('/:id/products', JWTAuthourize, async (ctx, next) => {
  return ProductsController.create(ctx);
});

export default categoriesRouter;
