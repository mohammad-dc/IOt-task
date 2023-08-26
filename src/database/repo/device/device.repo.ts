import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../database/prisma-service/prisma.service';

export class DeviceRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async create(args: Prisma.DeviceUncheckedCreateInput) {
    return await this.prismaService.db.device.create({ data: args });
  }

  async retrieve(id: number) {
    return await this.prismaService.db.device.findFirst({ where: { id } });
  }
}
