import { Prisma } from '@prisma/client';
import { DeviceRepo } from '../../../database/repo/device/device.repo';
import { GeofenceRepo } from 'src/database/repo/geofence/geofence.repo';
import { GeofenceHelper } from '../geofence/helper/geofence.helper';
import { io } from '../../../lib/utils/server/server.util';

export class DeviceService {
  constructor(
    private readonly deviceRepo: DeviceRepo,
    private readonly geofenceRepo: GeofenceRepo,
    private readonly geofenceHelper: GeofenceHelper
  ) {}

  async create(args: Prisma.DeviceUncheckedCreateInput) {
    //* I'm assuming in data json there's location as key with value {lat, lng}
    const deviceLocation = args.data['location'];

    const geoResult = await this.geofenceRepo.list();
    const geofence = geoResult[0];

    const isInGeofence = this.geofenceHelper.isPointInCircle(
      deviceLocation,
      {
        lat: geofence.lat,
        lng: geofence.lng,
      },
      geofence.radius
    );

    const result = await this.deviceRepo.create({
      ...args,
      geofenceStatus: isInGeofence,
    });

    io.emit('device-data', result);
  }

  async retrieve(id: number) {
    return await this.deviceRepo.retrieve(id);
  }
}
