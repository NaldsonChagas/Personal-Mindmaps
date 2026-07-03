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
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderResponseDto } from './dto/folder-response.dto';

@ApiTags('Folders')
@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  @ApiOperation({ summary: 'List all folders' })
  @ApiResponse({ status: 200, description: 'Folders retrieved', type: [FolderResponseDto] })
  async findAll(): Promise<FolderResponseDto[]> {
    const folders = await this.foldersService.findAll();
    return folders.map(FolderResponseDto.fromDomain);
  }

  @Post()
  @ApiOperation({ summary: 'Create a folder' })
  @ApiCreatedResponse({ description: 'Folder created', type: FolderResponseDto })
  async create(@Body() dto: CreateFolderDto): Promise<FolderResponseDto> {
    const folder = await this.foldersService.create(dto);
    return FolderResponseDto.fromDomain(folder);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Rename a folder' })
  @ApiParam({ name: 'id', description: 'Folder UUID' })
  @ApiResponse({ status: 200, description: 'Folder renamed', type: FolderResponseDto })
  @ApiNotFoundResponse({ description: 'Folder not found' })
  async rename(
    @Param('id') id: string,
    @Body() dto: UpdateFolderDto,
  ): Promise<FolderResponseDto> {
    const folder = await this.foldersService.rename(id, dto);
    return FolderResponseDto.fromDomain(folder);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a folder' })
  @ApiParam({ name: 'id', description: 'Folder UUID' })
  @ApiNoContentResponse({ description: 'Folder deleted' })
  @ApiNotFoundResponse({ description: 'Folder not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.foldersService.delete(id);
  }
}