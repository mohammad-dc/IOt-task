import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGeofenceDto {
  @IsLatitude()
  @IsNotEmpty()
  lat: number;

  @IsLongitude()
  @IsNotEmpty()
  lng: number;

  @IsNumber()
  @IsNotEmpty()
  radius: number;
}
