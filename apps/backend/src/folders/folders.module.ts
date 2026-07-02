import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FolderOrmEntity } from '../infrastructure/database/entities/folder.orm-entity';
import { FolderRepository } from '../infrastructure/database/repositories/folder.repository';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';

@Module({
  imports: [TypeOrmModule.forFeature([FolderOrmEntity])],
  controllers: [FoldersController],
  providers: [
    FoldersService,
    {
      provide: 'FOLDER_REPOSITORY',
      useClass: FolderRepository,
    },
  ],
  exports: ['FOLDER_REPOSITORY'],
})
export class FoldersModule {}