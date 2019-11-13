import { getConnection, getRepository, getManager, Entity } from 'typeorm';
import { Product } from '../models/product';

namespace ProductService {
  export async function allProducts() {
    const entityManager = getConnection().manager;
    return entityManager.find(Product);
  }

  export async function createProduct(categoryId, { name, description }) {
    const productRepository = getRepository(Product);
    return productRepository.save({
      name: name,
      description: description,
      categoryId: categoryId
    });
  }

  export async function findById(id) {
    return getRepository(Product).findOne(id);
  }

  export async function findFromCategoryId(categoryId) {
    return getRepository(Product).find({
      where: { category: categoryId }
    });
  }

  export async function findFromCategorySlug(categorySlug: string) {
    return getManager()
      .createQueryBuilder(Product, 'product')
      .innerJoin(
        'product.category',
        'category',
        'category.id = product.categoryId'
      )
      .where('category.slug = :categorySlug', { categorySlug: categorySlug })
      .getMany();
  }

  export async function updateProduct(id, { name, description }) {
    const productsRepository = getRepository(Product);
    let product = await productsRepository.findOne(id);
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    return productsRepository.save(product);
  }
}

export default ProductService;
