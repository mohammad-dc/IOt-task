import { HttpStatus } from './http-status';
import { Response } from 'express';

//TODO: needs to add logger like winston for cloud watch

export class ApiResponses {
  success(res: Response, body: { message?: string; meta?: any }) {
    return res.status(HttpStatus.OK).json({
      success: true,
      timestamp: new Date().toISOString(),
      ...body,
    });
  }

  createdSuccess(res: Response, body: { message?: string; meta?: any }) {
    return res.status(HttpStatus.CREATED).json({
      success: true,
      timestamp: new Date().toISOString(),
      ...body,
    });
  }

  internalServerError(res: Response, body: { message?: string; error?: any }) {
    return res.status(HttpStatus.INTERVAL_SERVER_ERROR).json({
      success: false,
      timestamp: new Date().toISOString(),
      ...body,
    });
  }

  badRequestError(res: Response, body: { message?: string; error?: any }) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      timestamp: new Date().toISOString(),
      ...body,
    });
  }

  unauthorizedError(res: Response) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Unauthorized',
    });
  }
}
