import { getConnection, getRepository, getManager, Entity } from 'typeorm';
import { Category } from '../models/category';

namespace CategoryService {
  export async function allCategories() {
    const entityManager = getConnection().manager;
    return entityManager.find(Category);
  }

  export async function createCategory({ name, description, slug }) {
    const categoriesRepository = getRepository(Category);
    return categoriesRepository.save({
      name: name,
      description: description,
      slug: slug
    });
  }

  export async function findById(id) {
    return getRepository(Category).findOne(id);
  }

  export async function updateCategory(id, { name, description, slug }) {
    const categoriesRepository = getRepository(Category);
    let category = await categoriesRepository.findOne(id);
    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (slug !== undefined) category.slug = slug;
    return categoriesRepository.save(category);
  }

  export async function deleteCategory(id) {
    const categoriesRepository = getRepository(Category);
    return categoriesRepository.delete(id);
  }

  export async function getProducts(id) {
    const categoriesRepository = getRepository(Category);
    let category = await categoriesRepository.findOne(id, {
      relations: ['products']
    });
    return category.products;
  }
}

export default CategoryService;
