import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MindMap } from '../../domain/mind-map/mind-map.entity';
import { MindElixirAdapter } from '../../domain/adapters/mind-elixir.adapter';

export class MindMapResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  folderId!: string | null;

  @ApiPropertyOptional({ description: 'Content in MindElixir format' })
  content?: object;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static fromDomain(mindMap: MindMap, includeContent = false): MindMapResponseDto {
    const dto = new MindMapResponseDto();
    dto.id = mindMap.id;
    dto.title = mindMap.title;
    dto.folderId = mindMap.folderId;
    dto.createdAt = mindMap.createdAt;
    dto.updatedAt = mindMap.updatedAt;
    if (includeContent) {
      dto.content = MindElixirAdapter.toMindElixir(mindMap.content);
    }
    return dto;
  }
}