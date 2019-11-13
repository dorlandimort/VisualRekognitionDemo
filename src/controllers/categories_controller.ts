import { BaseContext } from 'koa';
import CategoryService from '../services/category_service';

namespace ProductsController {
  export async function index(ctx: BaseContext) {
    ctx.body = await CategoryService.allCategories();
  }

  export async function create(ctx: BaseContext) {
    ctx.body = await CategoryService.createCategory(ctx.request.body);
  }

  export async function update(ctx: BaseContext) {
    ctx.body = await CategoryService.updateCategory(
      ctx.params.id,
      ctx.request.body
    );
  }

  export async function show(ctx: BaseContext) {
    ctx.body = await CategoryService.findById(ctx.params.id);
  }

  export async function destroy(ctx: BaseContext) {
    ctx.body = await CategoryService.deleteCategory(ctx.params.id);
  }

  export async function products(ctx: BaseContext) {
    ctx.body = await CategoryService.getProducts(ctx.params.id);
  }
}

export default ProductsController;
