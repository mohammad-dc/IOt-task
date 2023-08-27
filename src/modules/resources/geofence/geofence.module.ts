import { PrismaService } from '../../../database/prisma-service/prisma.service';
import { GeofenceRepo } from '../../../database/repo/geofence/geofence.repo';
import { GeofenceService } from './geofence.service';
import { GeofenceController } from './geofence.controller';
import { ApiResponses } from '../../../lib/api/shared/response/responses';
import { GeofenceRoute } from './geofence.route';
import { ValidatorMiddleware } from '../../../lib/api/shared/middleware/validator.middleware';
import { GeofenceHelper } from './helper/geofence.helper';

const prismaService = new PrismaService();
const apiResponses = new ApiResponses();
export const geofenceHelper = new GeofenceHelper();
export const geofenceRepo = new GeofenceRepo(prismaService);
const validatorMiddleware = new ValidatorMiddleware(apiResponses);
const geofenceService = new GeofenceService(geofenceRepo);
const geofenceController = new GeofenceController(
  geofenceService,
  apiResponses
);

export const geofenceRoute = new GeofenceRoute(
  geofenceController,
  validatorMiddleware
);
