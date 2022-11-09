import { DataSource } from 'typeorm';
import { Brand } from '../entities/brand.entity';

export const brandProviders = {
  provide: 'brand_repository',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Brand),
  inject: ['TypeORM'],
};
