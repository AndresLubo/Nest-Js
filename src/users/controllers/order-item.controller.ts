import { Controller, Post, Body } from '@nestjs/common';

import { CreateOrderItemDto } from './../dtos/order-item.dto';
import { OrderItemService } from './../services/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Post()
  async create(@Body() payload: CreateOrderItemDto) {
    try {
      return await this.itemsService.create(payload);
    } catch (error) {
      return {
        message: 'Ocurrió un error al crear un item',
        error: error.response,
      };
    }
  }
}
