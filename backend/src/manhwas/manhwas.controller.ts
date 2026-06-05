import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ManhwasService } from './manhwas.service';
import { CreateManhwaDto } from './dto/create-manhwa.dto';
import { UpdateManhwaDto } from './dto/update-manhwa.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { Manhwa } from './entities/manhwa.entity';

@ApiTags('Manhwas')
@Controller('manhwas')
export class ManhwasController {
  constructor(private readonly manhwasService: ManhwasService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all manhwas (Public)' })
  @ApiResponse({ status: 200, description: 'List of all manhwas', type: [Manhwa] })
  findAll(): Promise<Manhwa[]> {
    return this.manhwasService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get manhwa by ID (Public)' })
  @ApiParam({ name: 'id', description: 'Manhwa UUID' })
  @ApiResponse({ status: 200, description: 'Manhwa details', type: Manhwa })
  @ApiResponse({ status: 404, description: 'Manhwa not found' })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Manhwa> {
    return this.manhwasService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new manhwa (Admin & Editor only)' })
  @ApiResponse({ status: 201, description: 'Manhwa created successfully', type: Manhwa })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createManhwaDto: CreateManhwaDto): Promise<Manhwa> {
    return this.manhwasService.create(createManhwaDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a manhwa (Admin & Editor only)' })
  @ApiParam({ name: 'id', description: 'Manhwa UUID' })
  @ApiResponse({ status: 200, description: 'Manhwa updated successfully', type: Manhwa })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Manhwa not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateManhwaDto: UpdateManhwaDto,
  ): Promise<Manhwa> {
    return this.manhwasService.update(id, updateManhwaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a manhwa (Admin & Editor only)' })
  @ApiParam({ name: 'id', description: 'Manhwa UUID' })
  @ApiResponse({ status: 204, description: 'Manhwa deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Manhwa not found' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.manhwasService.remove(id);
  }
}
