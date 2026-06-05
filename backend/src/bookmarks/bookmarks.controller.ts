import {
  Controller,
  Get,
  Post,
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
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { User } from '../users/entities/user.entity';
import { Bookmark } from './entities/bookmark.entity';

@ApiTags('Bookmarks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.USER, UserRole.EDITOR, UserRole.ADMIN)
@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bookmarks for the current user' })
  @ApiResponse({ status: 200, description: 'List of bookmarks', type: [Bookmark] })
  findAll(@CurrentUser() currentUser: User): Promise<Bookmark[]> {
    return this.bookmarksService.findAllByUser(currentUser.id);
  }

  @Post()
  @ApiOperation({ summary: 'Add a manhwa to bookmarks' })
  @ApiResponse({ status: 201, description: 'Bookmark created', type: Bookmark })
  @ApiResponse({ status: 404, description: 'Manhwa not found' })
  @ApiResponse({ status: 409, description: 'Already bookmarked' })
  create(
    @CurrentUser() currentUser: User,
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarksService.create(currentUser, createBookmarkDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove a bookmark' })
  @ApiParam({ name: 'id', description: 'Bookmark UUID' })
  @ApiResponse({ status: 204, description: 'Bookmark removed' })
  @ApiResponse({ status: 403, description: 'Cannot delete another user\'s bookmark' })
  @ApiResponse({ status: 404, description: 'Bookmark not found' })
  remove(
    @CurrentUser() currentUser: User,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.bookmarksService.remove(currentUser, id);
  }
}
