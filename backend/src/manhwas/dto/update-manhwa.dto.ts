import { PartialType } from '@nestjs/swagger';
import { CreateManhwaDto } from './create-manhwa.dto';

export class UpdateManhwaDto extends PartialType(CreateManhwaDto) {}
