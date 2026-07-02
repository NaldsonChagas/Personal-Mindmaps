import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MindMapOrmEntity } from './mind-map.orm-entity';

@Entity('folders')
export class FolderOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  name!: string;

  @OneToMany(() => MindMapOrmEntity, (mindMap) => mindMap.folder)
  mindMaps!: MindMapOrmEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
