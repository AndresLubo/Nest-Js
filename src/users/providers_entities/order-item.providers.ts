import { DataSource } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';

export const OrderItemProviders = {
  provide: 'order_item_repository',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(OrderItem),
  inject: ['TypeORM'],
};
