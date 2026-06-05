import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManhwasService } from './manhwas.service';
import { ManhwasController } from './manhwas.controller';
import { Manhwa } from './entities/manhwa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manhwa])],
  controllers: [ManhwasController],
  providers: [ManhwasService],
  exports: [ManhwasService],
})
export class ManhwasModule {}
