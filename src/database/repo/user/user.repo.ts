import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma-service/prisma.service';

export class UserRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async create(args: Prisma.UserUncheckedCreateInput) {
    return await this.prismaService.db.user.create({ data: args });
  }

  async retrieve(args: Prisma.UserFindFirstArgs) {
    return await this.prismaService.db.user.findFirst(args);
  }
}
