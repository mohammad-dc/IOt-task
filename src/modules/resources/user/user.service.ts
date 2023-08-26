import { Prisma } from '@prisma/client';
import { UserRepo } from 'src/database/repo/user/user.repo';

export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  async create(args: Prisma.UserUncheckedCreateInput) {
    return await this.userRepo.create(args);
  }

  async retrieve(args: Prisma.UserFindFirstArgs) {
    return await this.userRepo.retrieve(args);
  }
}
