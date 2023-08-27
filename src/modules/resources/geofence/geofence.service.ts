import { Prisma } from '@prisma/client';
import { GeofenceRepo } from 'src/database/repo/geofence/geofence.repo';

export class GeofenceService {
  constructor(private readonly geofenceRepo: GeofenceRepo) {}

  async create(args: Prisma.GeofenceUncheckedCreateInput) {
    return await this.geofenceRepo.create(args);
  }

  async list() {
    return await this.geofenceRepo.list();
  }
}
