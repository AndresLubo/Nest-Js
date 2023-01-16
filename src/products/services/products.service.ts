import { Injectable, NotFoundException, Inject } from '@nestjs/common';

//! Implementano mongoose
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product2 } from './../entities/product.entity';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from './../dtos/products.dto';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

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
    @InjectModel(Product2.name) private productModel: Model<Product2>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return await this.productRepository.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
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
      id: In(data.categoriesIds),
    });
    newProduct.categories = categories;
    return await this.productRepository.save(newProduct);
  }

  //! Manipulacion de arrays
  async removeCategory(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      relations: ['categories'],
      where: { id: productId },
    });
    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );
    return await this.productRepository.save(product);
  }

  async addCategory(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      relations: ['categories'],
      where: { id: productId },
    });
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    product.categories.push(category);
    return await this.productRepository.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepository.findOneBy({
        id: changes.brandId,
      });
      product.brand = brand;
    }

    if (changes.categoriesIds) {
    }
    this.productRepository.merge(product, changes);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.productRepository.delete(id);
  }

  //! Métodos con conexión a mongoDB
  findAllMongo(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};

      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $ltg: maxPrice };
      }

      return this.productModel.find(filters).skip(offset).limit(limit).exec();
    }
    return this.productModel.find().exec();
  }

  findOneMongo(id: string) {
    return this.productModel.findById(id).exec();
  }

  createProductMongo(data: CreateProductDto) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  updateProductMongo(id: string, changes: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  deleteProductMongo(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
