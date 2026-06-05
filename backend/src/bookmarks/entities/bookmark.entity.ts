import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Manhwa } from '../../manhwas/entities/manhwa.entity';

@Entity('bookmarks')
@Unique(['userId', 'manhwaId'])
export class Bookmark {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user-uuid' })
  @Column({ name: 'user_id' })
  userId: string;

  @ApiProperty({ example: 'manhwa-uuid' })
  @Column({ name: 'manhwa_id' })
  manhwaId: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.bookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Manhwa, (manhwa) => manhwa.bookmarks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'manhwa_id' })
  manhwa: Manhwa;
}
