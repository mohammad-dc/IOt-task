import { Request, Response } from 'express';
import { DeviceService } from './device.service';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponses } from '../../../lib/api/shared/response/responses';

export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly apiResponses: ApiResponses
  ) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.deviceService.create({
        data: req.body.data,
        deviceId: uuidv4(),
        userId: (req as any).user,
      });

      return this.apiResponses.createdSuccess(res, {
        message: 'Device created Successfully',
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
      const result = await this.deviceService.retrieve(parseInt(req.params.id));
      return this.apiResponses.success(res, { meta: result });
    } catch (error) {
      return this.apiResponses.internalServerError(res, {
        message: 'Something went wrong',
        error,
      });
    }
  }
}
