import { ApiProperty } from '@nestjs/swagger';
import { Folder } from '../../domain/folder/folder.entity';

export class FolderResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  static fromDomain(folder: Folder): FolderResponseDto {
    const dto = new FolderResponseDto();
    dto.id = folder.id;
    dto.name = folder.name;
    dto.createdAt = folder.createdAt;
    dto.updatedAt = folder.updatedAt;
    return dto;
  }
}