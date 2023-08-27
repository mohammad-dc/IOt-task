import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma-service/prisma.service';

export class GeofenceRepo {
  constructor(private readonly prismaService: PrismaService) {}

  async create(args: Prisma.GeofenceUncheckedCreateInput) {
    return await this.prismaService.db.geofence.create({ data: args });
  }

  async list() {
    return await this.prismaService.db.geofence.findMany();
  }
}
