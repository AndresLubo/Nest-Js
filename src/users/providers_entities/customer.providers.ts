import { DataSource } from 'typeorm';
import { Customer } from '../entities/customer.entity';

export const customerProviders = {
  provide: 'customer_repository',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Customer),
  inject: ['TypeORM'],
};
