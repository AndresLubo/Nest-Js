import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('product_repository')
    private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }
}
