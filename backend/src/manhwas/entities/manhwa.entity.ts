import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';

@Entity('manhwas')
export class Manhwa {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Solo Leveling' })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({ example: 'Chugong' })
  @Column({ length: 255 })
  author: string;

  @ApiProperty({ example: 'A story about a hunter who gains the ability to level up...' })
  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @ApiProperty({ example: 'https://example.com/cover.jpg', nullable: true })
  @Column({ name: 'cover_image', nullable: true, length: 500 })
  coverImage: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.manhwa)
  bookmarks: Bookmark[];
}
