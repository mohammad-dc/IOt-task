import { PrismaClient } from '@prisma/client';

export class PrismaService {
  db: PrismaClient;
  constructor() {
    this.db = new PrismaClient();
  }
}
