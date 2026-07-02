import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMindMapDto {
  @ApiProperty({ example: 'My First Mind Map' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title!: string;

  @ApiPropertyOptional({ example: 'uuid-of-folder' })
  @IsUUID()
  @IsOptional()
  folderId?: string;
}