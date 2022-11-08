import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';

export const productProviders = {
  provide: 'product_repository',
  useFactory: (datasource: DataSource) => datasource.getRepository(Product),
  inject: ['TypeORM'],
};
