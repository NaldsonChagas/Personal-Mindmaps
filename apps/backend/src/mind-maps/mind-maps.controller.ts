import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Body } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MindMapsService } from './mind-maps.service';
import { CreateMindMapDto } from './dto/create-mind-map.dto';
import { UpdateMindMapDto } from './dto/update-mind-map.dto';
import { MoveMindMapDto } from './dto/move-mind-map.dto';
import { MindMapResponseDto } from './dto/mind-map-response.dto';

@ApiTags('Mind Maps')
@Controller('mind-maps')
export class MindMapsController {
  constructor(private readonly mindMapsService: MindMapsService) {}

  @Get()
  @ApiOperation({ summary: 'List all mind maps' })
  @ApiQuery({ name: 'folderId', required: false, description: 'Filter by folder UUID' })
  @ApiResponse({ status: 200, description: 'Mind maps retrieved', type: [MindMapResponseDto] })
  async findAll(
    @Query('folderId') folderId?: string,
  ): Promise<MindMapResponseDto[]> {
    const mindMaps = await this.mindMapsService.findAll(folderId);
    return mindMaps.map((m) => MindMapResponseDto.fromDomain(m, false));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a mind map by ID' })
  @ApiParam({ name: 'id', description: 'Mind map UUID' })
  @ApiResponse({ status: 200, description: 'Mind map retrieved', type: MindMapResponseDto })
  @ApiNotFoundResponse({ description: 'Mind map not found' })
  async findById(@Param('id') id: string): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.findById(id);
    return MindMapResponseDto.fromDomain(mindMap, true);
  }

  @Post()
  @ApiOperation({ summary: 'Create a mind map' })
  @ApiCreatedResponse({ description: 'Mind map created', type: MindMapResponseDto })
  async create(@Body() dto: CreateMindMapDto): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.create(dto);
    return MindMapResponseDto.fromDomain(mindMap, false);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update title or content of a mind map' })
  @ApiParam({ name: 'id', description: 'Mind map UUID' })
  @ApiResponse({ status: 200, description: 'Mind map updated', type: MindMapResponseDto })
  @ApiNotFoundResponse({ description: 'Mind map not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMindMapDto,
  ): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.rename(id, dto);
    return MindMapResponseDto.fromDomain(mindMap, false);
  }

  @Patch(':id/move')
  @ApiOperation({ summary: 'Move a mind map to a folder' })
  @ApiParam({ name: 'id', description: 'Mind map UUID' })
  @ApiResponse({ status: 200, description: 'Mind map moved', type: MindMapResponseDto })
  @ApiNotFoundResponse({ description: 'Mind map not found' })
  async move(
    @Param('id') id: string,
    @Body() dto: MoveMindMapDto,
  ): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.move(id, dto);
    return MindMapResponseDto.fromDomain(mindMap, false);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a mind map' })
  @ApiParam({ name: 'id', description: 'Mind map UUID' })
  @ApiNoContentResponse({ description: 'Mind map deleted' })
  @ApiNotFoundResponse({ description: 'Mind map not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.mindMapsService.delete(id);
  }
}