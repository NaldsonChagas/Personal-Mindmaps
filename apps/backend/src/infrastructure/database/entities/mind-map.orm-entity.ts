import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FolderOrmEntity } from './folder.orm-entity';

@Entity('mind_maps')
export class MindMapOrmEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ name: 'folder_id', type: 'uuid', nullable: true })
  folderId!: string | null;

  @ManyToOne(() => FolderOrmEntity, (folder) => folder.mindMaps, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'folder_id' })
  folder!: FolderOrmEntity;

  @Column({ type: 'jsonb' })
  content!: object;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
