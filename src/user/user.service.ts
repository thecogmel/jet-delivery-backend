import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createUser = await this.prisma.user.create({ data });
    return { ...createUser, password: undefined };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return { ...user, password: undefined };
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
