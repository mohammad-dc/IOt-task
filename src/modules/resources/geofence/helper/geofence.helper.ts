import { Point } from '../types/geofence.type';

export class GeofenceHelper {
  isPointInCircle(point: Point, center: Point, radius: number) {
    const earthRadiusInMeters = 6371e3;

    const dLat = this.degToRad(point.lat - center.lat);
    const dLng = this.degToRad(point.lng - center.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degToRad(center.lat)) *
        Math.cos(this.degToRad(point.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const _center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusInMeters * _center;

    return distance <= radius;
  }

  degToRad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
