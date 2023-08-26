import { Prisma } from '@prisma/client';
import { DeviceRepo } from '../../../database/repo/device/device.repo';

export class DeviceService {
  constructor(private readonly deviceRepo: DeviceRepo) {}

  async create(args: Prisma.DeviceUncheckedCreateInput) {
    return await this.deviceRepo.create(args);
  }

  async retrieve(id: number) {
    return await this.deviceRepo.retrieve(id);
  }
}
