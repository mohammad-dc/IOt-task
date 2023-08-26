import { UserRepo } from '../../../database/repo/user/user.repo';
import { PrismaService } from '../../../database/prisma-service/prisma.service';
import { ValidatorMiddleware } from '../../../lib/api/shared/middleware/validator.middleware';
import { ApiResponses } from '../../../lib/api/shared/response/responses';
import { JwtService } from '../../../lib/api/shared/services/jwtService/jwt.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserHelper } from './helper/user.helper';
import { UserRoute } from './user.route';

const prismaService = new PrismaService();
const apiResponses = new ApiResponses();
const jwtService = new JwtService();
const userHelper = new UserHelper();
const validatorMiddleware = new ValidatorMiddleware(apiResponses);
const userRepo = new UserRepo(prismaService);
const userService = new UserService(userRepo);
const userController = new UserController(
  userService,
  apiResponses,
  userHelper,
  jwtService
);

export const userRoute = new UserRoute(userController, validatorMiddleware);
