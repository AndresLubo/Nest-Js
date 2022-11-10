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
import { orderItemProviders } from './providers_entities/order-item.providers';

@Module({
  imports: [ProductsModule, ConfigModule],
  controllers: [CustomerController, UsersController],
  providers: [
    CustomersService,
    customerProviders,
    UsersService,
    userProviders,
    orderProviders,
    orderItemProviders,
  ],
})
export class UsersModule {}
