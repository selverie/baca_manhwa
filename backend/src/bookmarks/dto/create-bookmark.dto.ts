import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({ example: 'manhwa-uuid', description: 'UUID of the manhwa to bookmark' })
  @IsNotEmpty()
  @IsUUID('4', { message: 'manhwaId must be a valid UUID' })
  manhwaId: string;
}
