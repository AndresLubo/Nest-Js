import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { OrderItem } from './../entities/order-item.entity';
import { Product } from './../../products/entities/product.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @Inject('order_repository') private orderRepository: Repository<Order>,
    @Inject('order_item_repository')
    private itemRepository: Repository<OrderItem>,
    @Inject('product_repository')
    private productRepository: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepository.findOneBy({ id: data.orderId });
    if (!order)
      throw new NotFoundException(`Order id ${data.orderId} not found`);

    const product = await this.productRepository.findOneBy({
      id: data.productId,
    });

    if (!product)
      throw new NotFoundException(`Product id ${data.productId} not found`);

    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return await this.itemRepository.save(item);
  }
}
