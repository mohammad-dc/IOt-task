import { Router } from 'express';
import { ValidatorMiddleware } from 'src/lib/api/shared/middleware/validator.middleware';
import { UserController } from './user.controller';

export class UserRoute {
  public readonly router = Router({ mergeParams: true });

  constructor(
    private readonly userController: UserController,
    private readonly validatorMiddleware: ValidatorMiddleware
  ) {
    this.initRoutes();
  }

  createUser() {
    this.router.post(
      '/create',
      this.validatorMiddleware.validateRequestBody.bind(
        this.validatorMiddleware
      ),
      this.userController.create.bind(this.userController)
    );
  }

  retrieveUser() {
    this.router.get(
      '/:id',
      this.userController.retrieve.bind(this.userController)
    );
  }

  loginUser() {
    this.router.post(
      '/login',
      this.validatorMiddleware.validateRequestBody.bind(
        this.validatorMiddleware
      ),
      this.userController.login.bind(this.userController)
    );
  }

  initRoutes() {
    this.createUser();
    this.loginUser();
    this.retrieveUser();
  }
}
