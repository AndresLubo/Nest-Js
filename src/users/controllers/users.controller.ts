import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      return {
        message: 'Ocurrió un error al mostrar los usuarios',
        error: error.response,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.findOne(id);
    } catch (error) {
      return {
        message: `Ocurrió un error al mostrar el usuario ${id}`,
        error: error.response,
      };
    }
  }

  @Post()
  async create(@Body() payload: CreateUserDto) {
    try {
      return await this.usersService.create(payload);
    } catch (error) {
      return {
        message: 'Ocurrió un error al crear el usuario',
        error: error.response,
      };
    }
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    // return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // return this.usersService.remove(+id);
  }
}
