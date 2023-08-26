import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsJSON()
  data: any;
}
