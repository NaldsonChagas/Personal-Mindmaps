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
import { ApiTags } from '@nestjs/swagger';
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
  async findAll(
    @Query('folderId') folderId?: string,
  ): Promise<MindMapResponseDto[]> {
    const mindMaps = await this.mindMapsService.findAll(folderId);
    return mindMaps.map((m) => MindMapResponseDto.fromDomain(m, false));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.findById(id);
    return MindMapResponseDto.fromDomain(mindMap, true);
  }

  @Post()
  async create(@Body() dto: CreateMindMapDto): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.create(dto);
    return MindMapResponseDto.fromDomain(mindMap, false);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateMindMapDto,
  ): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.rename(id, dto);
    return MindMapResponseDto.fromDomain(mindMap, false);
  }

  @Patch(':id/move')
  async move(
    @Param('id') id: string,
    @Body() dto: MoveMindMapDto,
  ): Promise<MindMapResponseDto> {
    const mindMap = await this.mindMapsService.move(id, dto);
    return MindMapResponseDto.fromDomain(mindMap, false);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    await this.mindMapsService.delete(id);
  }
}