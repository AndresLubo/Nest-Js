import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  findAll() {}

  findOne(id: number) {}

  create(data: CreateBrandDto) {}

  update(id: number, changes: UpdateBrandDto) {}

  remove(id: number) {}
}
