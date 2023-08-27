import { Router } from 'express';
import { GeofenceController } from './geofence.controller';
import { ValidatorMiddleware } from 'src/lib/api/shared/middleware/validator.middleware';

export class GeofenceRoute {
  public readonly router = Router({ mergeParams: true });

  constructor(
    private readonly geofenceController: GeofenceController,
    private readonly validatorMiddleware: ValidatorMiddleware
  ) {
    this.initRoutes();
  }

  createGeofence() {
    this.router.post(
      '/create',
      this.validatorMiddleware.validateRequestBody.bind(
        this.validatorMiddleware
      ),
      this.geofenceController.create.bind(this.geofenceController)
    );
  }

  listGeofence() {
    this.router.get(
      '/',
      this.geofenceController.list.bind(this.geofenceController)
    );
  }

  initRoutes() {
    this.createGeofence();
    this.listGeofence();
  }
}
