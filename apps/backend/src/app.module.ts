import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { FolderOrmEntity } from './infrastructure/database/entities/folder.orm-entity';
import { MindMapOrmEntity } from './infrastructure/database/entities/mind-map.orm-entity';
import { FoldersModule } from './folders/folders.module';
import { MindMapsModule } from './mind-maps/mind-maps.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('database.url'),
        entities: [FolderOrmEntity, MindMapOrmEntity],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    FoldersModule,
    MindMapsModule,
  ],
})
export class AppModule {}