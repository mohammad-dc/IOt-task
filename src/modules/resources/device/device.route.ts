import { Router } from 'express';
import { AuthMiddleware } from '../../../lib/api/shared/middleware/auth.middleware';
import { ValidatorMiddleware } from '../../../lib/api/shared/middleware/validator.middleware';
import { DeviceController } from './device.controller';

export class DeviceRoute {
  public readonly router = Router({ mergeParams: true });
  constructor(
    private readonly deviceController: DeviceController,
    private readonly authMiddleware: AuthMiddleware,
    private readonly validatorMiddleware: ValidatorMiddleware
  ) {
    this.initRoutes();
  }

  createDevice() {
    this.router.post(
      '/create',
      this.authMiddleware.isAuthenticated.bind(this.authMiddleware),
      this.validatorMiddleware.validateRequestBody.bind(
        this.validatorMiddleware
      ),
      this.deviceController.create.bind(this.deviceController)
    );
  }

  retrieveDevice() {
    this.router.get(
      '/:id',
      this.deviceController.retrieve.bind(this.deviceController)
    );
  }

  initRoutes() {
    this.createDevice();
    this.retrieveDevice();
  }
}
