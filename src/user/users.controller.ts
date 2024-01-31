import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseGuards
} from '@nestjs/common';
import User from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { JWTAuthGuard } from '../auth/local-jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JWTAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JWTAuthGuard)
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(Number(id));
  }

  @Post()
  @UseGuards(JWTAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  @UseGuards(JWTAuthGuard)
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteById(Number(id));
  }
}
