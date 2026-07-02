import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderResponseDto } from './dto/folder-response.dto';

@ApiTags('Folders')
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  async findAll(): Promise<FolderResponseDto[]> {
    const folders = await this.foldersService.findAll();
    return folders.map(FolderResponseDto.fromDomain);
  }

  @Post()
  async create(@Body() dto: CreateFolderDto): Promise<FolderResponseDto> {
    const folder = await this.foldersService.create(dto);
    return FolderResponseDto.fromDomain(folder);
  }

  @Patch(':id')
  async rename(
    @Param('id') id: string,
    @Body() dto: UpdateFolderDto,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersService.rename(id, dto);
    return FolderResponseDto.fromDomain(folder);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.foldersService.delete(id);
  }
}