import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dto';
import { In, Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('product_repository')
    private productRepository: Repository<Product>,
    @Inject('brand_repository')
    private brandRepository: Repository<Brand>,
    @Inject('category_repository')
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      relations: ['brand', 'categories'],
      where: { id },
    });

    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    const brand = await this.brandRepository.findOneBy({ id: data.brandId });
    newProduct.brand = brand;
    const categories = await this.categoryRepository.findBy({
      id: In([1, 2, 3]),
    });
    newProduct.categories = categories;
    return await this.productRepository.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepository.findOneBy({
        id: changes.brandId,
      });
      product.brand = brand;
    }
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepository.delete(id);
  }
}
