import { ApiResponses } from 'src/lib/api/shared/response/responses';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { UserHelper } from './helper/user.helper';
import { JwtService } from 'src/lib/api/shared/services/jwtService/jwt.service';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly apiResponses: ApiResponses,
    private readonly userHelper: UserHelper,
    private readonly jwtService: JwtService
  ) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.userService.create({
        password: await this.userHelper.hashPassword(req.body.password),
        username: req.body.username,
      });

      return this.apiResponses.createdSuccess(res, {
        message: 'user created successfully',
        meta: result,
      });
    } catch (error) {
      console.log(error);
      return this.apiResponses.internalServerError(res, {
        message: 'Something went wrong',
        error,
      });
    }
  }

  async retrieve(req: Request, res: Response) {
    try {
      const result = await this.userService.retrieve({
        where: { id: parseInt(req.params.id) },
      });

      return this.apiResponses.success(res, { meta: result });
    } catch (error) {
      return this.apiResponses.internalServerError(res, {
        message: 'Something went wrong',
        error,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result = await this.userService.retrieve({
        where: { username: req.body.username },
      });

      const passwordMatch = await this.userHelper.comparePassword(
        req.body.password,
        result.password
      );

      if (!passwordMatch)
        return this.apiResponses.badRequestError(res, {
          message: 'password mismatch',
        });

      const token = this.jwtService.generateAuthToken({
        userId: result.id,
        username: result.username,
      });

      console.log({ token });

      //TODO: save token in cookie

      return this.apiResponses.success(res, { meta: result });
    } catch (error) {
      console.log(error);
      return this.apiResponses.internalServerError(res, {
        message: 'Something went wrong',
        error,
      });
    }
  }
}
