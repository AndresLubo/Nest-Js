import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  findAll() {}

  findOne(id: number) {}

  create(data: CreateCategoryDto) {}

  update(id: number, changes: UpdateCategoryDto) {}

  remove(id: number) {}
}
