import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('customer_repository')
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) throw new NotFoundException(`Customer id: ${id} not found`);
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(data);
    return await this.customerRepository.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepository.merge(customer, changes);
    return await this.customerRepository.save(customer);
  }

  async remove(id: number) {
    const customer = await this.findOne(id);
    return await this.customerRepository.delete(id);
  }
}
