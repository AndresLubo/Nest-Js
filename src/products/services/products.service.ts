import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';
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

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    return await this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepository.delete(id);
  }
}
