import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindMapOrmEntity } from '../infrastructure/database/entities/mind-map.orm-entity';
import { MindMapRepository } from '../infrastructure/database/repositories/mind-map.repository';
import { MindMapsController } from './mind-maps.controller';
import { MindMapsService } from './mind-maps.service';
import { FoldersModule } from '../folders/folders.module';

@Module({
  imports: [TypeOrmModule.forFeature([MindMapOrmEntity]), FoldersModule],
  controllers: [MindMapsController],
  providers: [
    MindMapsService,
    {
      provide: 'MIND_MAP_REPOSITORY',
      useClass: MindMapRepository,
    },
  ],
})
export class MindMapsModule {}