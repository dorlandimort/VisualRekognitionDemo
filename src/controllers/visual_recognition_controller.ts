import { BaseContext } from 'koa';
import * as fs from 'fs';
import * as visualRecognitionService from '../services/IBM_visual_recognition_service';
import ProductService from '../services/product_service';
import VrRequestService from '../services/vr_request_service';

namespace VisualRecognitionController {
  export async function getClassification(ctx: BaseContext) {
    const imagePath = ctx.request.files.image.path;
    let imageFile = fs.createReadStream(imagePath);
    let classification = await visualRecognitionService.getClassification(
      imageFile
    );
    let products = await ProductService.findFromCategorySlug(
      classification.class
    );
    await VrRequestService.createVrRequest(ctx.currentUser.id);
    ctx.body = { classification: classification, products: products };
  }
}

export default VisualRecognitionController;
