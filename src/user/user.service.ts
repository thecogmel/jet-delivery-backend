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
    const { address, ...user } = createUserDto;
    user.password = await bcrypt.hash(user.password, 10);

    const createUser = await this.prisma.user.create({
      data: {
        ...user,
        addresses: {
          create: [address],
        },
      },
      select: {
        addresses: true,
        id: true,
        name: true,
        password: false,
        phone: true,
        username: true,
      },
    });

    return createUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        addresses: true,
        id: true,
        name: true,
        password: false,
        phone: true,
        username: true,
      },
    });
    return users.map((user) => user);
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        addresses: true,
        id: true,
        name: true,
        password: false,
        phone: true,
        username: true,
      },
    });
    return user;
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findUnique({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        addresses: true,
        id: true,
        name: true,
        password: false,
        phone: true,
        username: true,
      },
    });

    return updateUser;
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
