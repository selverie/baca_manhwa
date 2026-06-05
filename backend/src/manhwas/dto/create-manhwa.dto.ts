import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateManhwaDto {
  @ApiProperty({ example: 'Solo Leveling', description: 'Title of the manhwa' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Chugong', description: 'Author of the manhwa' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  author: string;

  @ApiPropertyOptional({
    example: 'A story about a weak hunter who becomes the strongest...',
    description: 'Synopsis of the manhwa',
  })
  @IsOptional()
  @IsString()
  synopsis?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/cover.jpg',
    description: 'URL of the cover image',
  })
  @IsOptional()
  @IsUrl({}, { message: 'coverImage must be a valid URL' })
  @MaxLength(500)
  coverImage?: string;
}
