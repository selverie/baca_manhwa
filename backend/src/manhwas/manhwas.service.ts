import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manhwa } from './entities/manhwa.entity';
import { CreateManhwaDto } from './dto/create-manhwa.dto';
import { UpdateManhwaDto } from './dto/update-manhwa.dto';

@Injectable()
export class ManhwasService {
  constructor(
    @InjectRepository(Manhwa)
    private readonly manhwaRepository: Repository<Manhwa>,
  ) {}

  async findAll(): Promise<Manhwa[]> {
    return this.manhwaRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Manhwa> {
    const manhwa = await this.manhwaRepository.findOne({ where: { id } });

    if (!manhwa) {
      throw new NotFoundException(`Manhwa with ID "${id}" not found`);
    }

    return manhwa;
  }

  async create(createManhwaDto: CreateManhwaDto): Promise<Manhwa> {
    const manhwa = this.manhwaRepository.create(createManhwaDto);
    return this.manhwaRepository.save(manhwa);
  }

  async update(id: string, updateManhwaDto: UpdateManhwaDto): Promise<Manhwa> {
    const manhwa = await this.findOne(id);

    Object.assign(manhwa, updateManhwaDto);
    return this.manhwaRepository.save(manhwa);
  }

  async remove(id: string): Promise<void> {
    const manhwa = await this.findOne(id);
    await this.manhwaRepository.remove(manhwa);
  }
}
