import { Module } from '@nestjs/common';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from '../products/products.module';
import { userProviders } from './providers_entities/user.providers';
import { customerProviders } from './providers_entities/customer.providers';
import { orderProviders } from './providers_entities/order.providers';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderItemService } from './services/order-item.service';
import { OrderItemProviders } from './providers_entities/order-item.providers';
import { OrderItemController } from './controllers/order-item.controller';
import { productProviders } from 'src/products/providers_entities/product.providers';

@Module({
  imports: [ProductsModule, ConfigModule],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [
    CustomersService,
    customerProviders,
    UsersService,
    userProviders,
    OrdersService,
    orderProviders,
    OrderItemService,
    OrderItemProviders,
    productProviders,
  ],
})
export class UsersModule {}
