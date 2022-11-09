import { DataSource } from 'typeorm';
import { Category } from '../entities/category.entity';

export const categoryProviders = {
  provide: 'category_repository',
  useFactory: (datasource: DataSource) => datasource.getRepository(Category),
  inject: ['TypeORM'],
};
