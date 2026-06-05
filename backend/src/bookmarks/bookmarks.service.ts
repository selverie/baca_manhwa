import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { ManhwasService } from '../manhwas/manhwas.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    private readonly manhwasService: ManhwasService,
  ) {}

  async findAllByUser(userId: string): Promise<Bookmark[]> {
    return this.bookmarkRepository.find({
      where: { userId },
      relations: ['manhwa'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(currentUser: User, createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    // Validate manhwa exists
    await this.manhwasService.findOne(createBookmarkDto.manhwaId);

    // Check if already bookmarked
    const existing = await this.bookmarkRepository.findOne({
      where: { userId: currentUser.id, manhwaId: createBookmarkDto.manhwaId },
    });

    if (existing) {
      throw new ConflictException('You have already bookmarked this manhwa');
    }

    const bookmark = this.bookmarkRepository.create({
      userId: currentUser.id,
      manhwaId: createBookmarkDto.manhwaId,
    });

    return this.bookmarkRepository.save(bookmark);
  }

  async remove(currentUser: User, bookmarkId: string): Promise<void> {
    const bookmark = await this.bookmarkRepository.findOne({
      where: { id: bookmarkId },
    });

    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID "${bookmarkId}" not found`);
    }

    if (bookmark.userId !== currentUser.id) {
      throw new ForbiddenException('You can only delete your own bookmarks');
    }

    await this.bookmarkRepository.remove(bookmark);
  }
}
