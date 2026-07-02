import { IsUUID, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MoveMindMapDto {
  @ApiPropertyOptional({ example: 'uuid-of-folder', nullable: true })
  @ValidateIf((o) => o.folderId !== null)
  @IsUUID()
  folderId!: string | null;
}