import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  findAll() {}

  findOne(id: number) {}

  create(data: CreateCustomerDto) {}

  update(id: number, changes: UpdateCustomerDto) {}

  remove(id: number) {}
}
