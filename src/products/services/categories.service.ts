import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('category_repository')
    private categoryRepository: Repository<Category>,
  ) {}
  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      relations: ['products'],
      where: { id },
    });
    if (!category) throw new NotFoundException(`Category id ${id} not found`);
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    return await this.categoryRepository.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepository.merge(category, changes);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return await this.categoryRepository.delete(id);
  }
}
