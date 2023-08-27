import { NextFunction, Request, Response } from 'express';
import { ApiResponses } from '../response/responses';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateDeviceDto } from '../../../../modules/resources/device/dto/create.dto';
import { CreateUserDto } from '../../../../modules/resources/user/dto/create.dto';
import { LoginUserDto } from '../../../../modules/resources/user/dto/login.dto';
import { CreateGeofenceDto } from '../../../../modules/resources/geofence/dto/create.dto';

const apiPaths = {
  '/api/v1/devices/create': CreateDeviceDto,
  '/api/v1/users/create': CreateUserDto,
  '/api/v1/users/login': LoginUserDto,
  '/api/v1/geofence/create': CreateGeofenceDto,
};
export class ValidatorMiddleware {
  constructor(private readonly apiResponses: ApiResponses) {}

  async validateRequestBody(req: Request, res: Response, next: NextFunction) {
    try {
      const dtoValidate = plainToInstance(
        apiPaths[`${req.baseUrl}${req.path}`],
        req.body
      );
      validate(dtoValidate).then((errors) => {
        if (errors.length > 0) {
          this.apiResponses.badRequestError(res, {
            message: Object.values(errors[0].constraints)[0],
            error: errors,
          });
        } else {
          next();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
