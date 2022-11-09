import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @Inject('brand_repository') private brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    return await this.brandRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({
      relations: ['products'],
      where: {
        id,
      },
    });
    if (!brand) throw new NotFoundException(`Brand id ${id} not found`);
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = this.brandRepository.create(data);
    return await this.brandRepository.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepository.merge(brand, changes);
    return await this.brandRepository.save(brand);
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    return await this.brandRepository.delete(id);
  }
}
