import { DeviceRepo } from '../../../database/repo/device/device.repo';
import { DeviceService } from './device.service';
import { PrismaService } from '../../../database/prisma-service/prisma.service';
import { DeviceController } from './device.controller';
import { ApiResponses } from '../../../lib/api/shared/response/responses';
import { DeviceRoute } from './device.route';
import { AuthMiddleware } from '../../../lib/api/shared/middleware/auth.middleware';
import { JwtService } from '../../../lib/api/shared/services/jwtService/jwt.service';
import { ValidatorMiddleware } from '../../../lib/api/shared/middleware/validator.middleware';
import { geofenceHelper, geofenceRepo } from '../geofence/geofence.module';

const prismaService = new PrismaService();
const apiResponses = new ApiResponses();
const jwtService = new JwtService();
const validatorMiddleware = new ValidatorMiddleware(apiResponses);
const authMiddleware = new AuthMiddleware(jwtService, apiResponses);
const deviceRepo = new DeviceRepo(prismaService);
const deviceService = new DeviceService(
  deviceRepo,
  geofenceRepo,
  geofenceHelper
);
const deviceController = new DeviceController(deviceService, apiResponses);

export const deviceRoute = new DeviceRoute(
  deviceController,
  authMiddleware,
  validatorMiddleware
);
