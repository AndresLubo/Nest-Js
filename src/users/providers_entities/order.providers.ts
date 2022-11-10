import { DataSource } from 'typeorm';
import { Order } from '../entities/order.entity';

export const orderProviders = {
  provide: 'order_repository',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
  inject: ['TypeORM'],
};
