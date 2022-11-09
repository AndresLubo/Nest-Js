import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('user_repository') private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User id: ${id} not found`);

    return user;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
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
