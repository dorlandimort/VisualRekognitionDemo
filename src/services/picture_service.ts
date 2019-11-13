import { getConnection, getRepository, getManager, Entity } from 'typeorm';
import { Picture } from '../models/picture';
import { Product } from '../models/product';
import S3Service from './s3_service';

namespace PictureService {
  export async function allPicturesFromProduct(productId) {
    return getManager()
      .createQueryBuilder(Picture, 'pictures')
      .innerJoin(
        'pictures.product',
        'product',
        'product.id = pictures.productId'
      )
      .where('product.id = :product_id', { product_id: productId })
      .getMany();
  }

  export async function createPicture(productId, file) {
    return new Promise<Picture>((resolve, reject) => {
      getManager().transaction(async manager => {
        let picture = await manager.create(Picture, {
          name: file.name,
          productId: productId
        });
        picture = await manager.save(picture);
        let picturePathOnS3 = `uploads/picture/${picture.id}/${picture.name}`;
        // save picture to amazon S3 and retrieve path or url
        const { key, url } = await S3Service.uploadFile(picturePathOnS3, file);
        picture.s3_key = key;
        picture.path = url;
        resolve(manager.save(picture));
      });
    });
  }

  export async function findById(id) {
    return getRepository(Picture).findOne(id);
  }

  export async function updatePicture(id, { name }, file) {
    const picturesRepository = getRepository(Picture);
    let picture = await picturesRepository.findOne(id);
    if (name !== undefined) picture.name = name;

    if (file !== undefined) {
      // delete previous picture
      // upload new picture
      // set the new picture url
    }
    return picturesRepository.save(picture);
  }

  export async function deletePicture(id) {
    const picturesRepository = getRepository(Picture);
    return picturesRepository.delete(id);
  }
}

export default PictureService;
