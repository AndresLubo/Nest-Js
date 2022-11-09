import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';

import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('user_repository') private userRepository: Repository<User>,
    private customerService: CustomersService,
  ) {}

  async findAll() {
    return await this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User id: ${id} not found`);

    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return await this.userRepository.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, changes);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.delete(id);
  }
}
