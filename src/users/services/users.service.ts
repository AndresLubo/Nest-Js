import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Client } from 'pg';

import { ConfigService } from '@nestjs/config';
import { ProductsService } from './../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private config: ConfigService,
    @Inject('TypeORM') private clientTypeORM: any,
    @Inject('pg') private clientPg: Client,
  ) {}


  // findAll() {}

  // findOne(id: number) {
  //   // const user = this.users.find((item) => item.id === id);
  //   // if (!user) {
  //   //   throw new NotFoundException(`User #${id} not found`);
  //   // }
  //   // return user;
  // }

  // create(data: CreateUserDto) {}

  // update(id: number, changes: UpdateUserDto) {}

  // remove(id: number) {}

  // getOrderByUser(id: number): Order {}
}
