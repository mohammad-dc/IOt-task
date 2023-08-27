import { deviceRoute } from '../../../modules/resources/device/device.module';
import { userRoute } from '../../../modules/resources/user/user.module';
import { geofenceRoute } from '../../../modules/resources/geofence/geofence.module';
import { Application } from 'express';

export const initAppRoutes = (app: Application) => {
  app.use('/api/v1/devices', deviceRoute.router);
  app.use('/api/v1/users', userRoute.router);
  app.use('/api/v1/geofence', geofenceRoute.router);
};
