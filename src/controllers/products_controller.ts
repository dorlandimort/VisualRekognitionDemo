import { BaseContext } from 'koa';
import ProductService from '../services/product_service';

namespace ProductsController {
  export async function index(ctx: BaseContext) {
    ctx.body = await ProductService.allProducts();
  }

  export async function show(ctx: BaseContext) {
    ctx.body = await ProductService.findById(ctx.params.id);
  }

  export async function fromCategory(ctx: BaseContext) {
    ctx.body = await ProductService.findFromCategoryId(ctx.params.category_id);
  }

  export async function create(ctx: BaseContext) {
    ctx.body = await ProductService.createProduct(
      ctx.params.id,
      ctx.request.body
    );
  }
}

export default ProductsController;
