import { Request, Response } from 'express';
import { GeofenceService } from './geofence.service';
import { ApiResponses } from 'src/lib/api/shared/response/responses';

export class GeofenceController {
  constructor(
    private readonly geofenceService: GeofenceService,
    private readonly apiResponses: ApiResponses
  ) {}

  async create(req: Request, res: Response) {
    try {
      await this.geofenceService.create({
        lat: req.body.lat,
        lng: req.body.lng,
        radius: req.body.radius,
      });

      return this.apiResponses.createdSuccess(res, {
        message: 'created successfully',
      });
    } catch (error) {
      return this.apiResponses.internalServerError(res, {
        message: 'something went wrong',
        error,
      });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await this.geofenceService.list();

      return this.apiResponses.success(res, { meta: result });
    } catch (error) {
      return this.apiResponses.internalServerError(res, {
        message: 'something went wrong',
        error,
      });
    }
  }
}
