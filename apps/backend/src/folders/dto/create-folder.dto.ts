import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFolderDto {
  @ApiProperty({ example: 'Work Projects' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;
}