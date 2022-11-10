import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('order_repository') private orderRepository: Repository<Order>,
    @Inject('customer_repository')
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll() {
    return await this.orderRepository.find();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      relations: ['items', 'items.product'],
      where: { id },
    });
    if (!order) throw new NotFoundException(`Order id ${id} not found`);
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new Order();
    const customer = await this.customerRepository.findOneBy({
      id: data.customerId,
    });

    if (!customer)
      throw new NotFoundException(`Customer id ${data.customerId} not found`);

    newOrder.customer = customer;
    return await this.orderRepository.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (changes.customerId) {
      const customer = await this.customerRepository.findOneBy({
        id: changes.customerId,
      });
      order.customer = customer;
    }
    return await this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return await this.orderRepository.delete(id);
  }
}
