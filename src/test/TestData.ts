import { getConnection } from 'typeorm';
import { Category } from '../models/category';
import { Product } from '../models/product';

export class TestData {
  public static async createTestData() {
    try {
      const connection = await getConnection();

      const categoryRepository = connection.getRepository(Category);
      const productRepository = connection.getRepository(Product);
      let products = [];

      const mouseCategory = await categoryRepository.save({
        name: 'Mouse',
        description: 'Mouse para computadora',
        slug: 'mouse'
      });

      let cafeteraCategory = await categoryRepository.save({
        name: 'Cafetera',
        description: 'Cafetera a presión',
        slug: 'cafetera'
      });

      products.push(
        await productRepository.save({
          name: 'Mouse Gamer Logitech g2123',
          description: '',
          category: mouseCategory
        })
      );

      products.push(
        await productRepository.save({
          name: 'Mouse óptico Perfect Choice',
          description: '',
          category: mouseCategory
        })
      );

      products.push(
        await productRepository.save({
          name: 'Mouse inalámbrico 2.4GHz',
          description: '',
          category: mouseCategory
        })
      );

      // cafeteras

      products.push(
        await productRepository.save({
          name: 'Cafetera Hamilton Beach',
          description: '',
          category: cafeteraCategory
        })
      );

      products.push(
        await productRepository.save({
          name: 'Cafetera de prensa francesa',
          description: '',
          category: cafeteraCategory
        })
      );

      products.push(
        await productRepository.save({
          name: 'Cafetera de cápsulas',
          description: '',
          category: cafeteraCategory
        })
      );

      products.push(
        await productRepository.save({
          name: 'Cafetera Perfect Coffe',
          description: '',
          category: cafeteraCategory
        })
      );

      return products;
    } catch (err) {
      return null;
    }
  }
}
