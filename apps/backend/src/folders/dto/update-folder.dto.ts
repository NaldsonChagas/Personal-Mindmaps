import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFolderDto {
  @ApiProperty({ example: 'Personal Projects' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;
}