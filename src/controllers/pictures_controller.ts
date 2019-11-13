import { BaseContext } from 'koa';
import PictureService from '../services/picture_service';

namespace PicturesController {
  export async function index(ctx: BaseContext) {
    ctx.body = await PictureService.allPicturesFromProduct(
      ctx.params.product_id
    );
  }

  export async function show(ctx: BaseContext) {
    ctx.body = await PictureService.findById(ctx.params.id);
  }

  export async function create(ctx: BaseContext) {
    ctx.body = await PictureService.createPicture(
      ctx.params.product_id,
      ctx.request.files.image
    );
  }

  export async function update(ctx: BaseContext) {
    ctx.body = await PictureService.updatePicture(
      ctx.params.id,
      ctx.request.body,
      ctx.request.files.image
    );
  }

  export async function destroy(ctx: BaseContext) {
    ctx.body = await PictureService.deletePicture(ctx.params.id);
  }
}

export default PicturesController;
