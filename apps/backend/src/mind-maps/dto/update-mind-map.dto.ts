import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMindMapDto {
  @ApiPropertyOptional({ example: 'Updated Title' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Full mind map content tree (MindElixir format)' })
  @IsOptional()
  content?: object;
}