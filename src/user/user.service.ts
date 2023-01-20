import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Res,
  Response,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

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

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return { ...user, password: undefined };
    });
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return { ...user, password: undefined };
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return { ...updateUser, password: undefined };
  }

  async remove(id: number) {
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return;
    } catch (error) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
