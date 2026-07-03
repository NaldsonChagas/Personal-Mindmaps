import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { FolderOrmEntity } from '../infrastructure/database/entities/folder.orm-entity';
import { MindMapOrmEntity } from '../infrastructure/database/entities/mind-map.orm-entity';
import { FoldersModule } from '../folders/folders.module';
import { MindMapsModule } from '../mind-maps/mind-maps.module';

describe('MindMaps (e2e)', () => {
  let app: INestApplication;
  let folderId: string;
  let mindMapId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            url: process.env.DATABASE_URL ?? 'postgresql://mindmap_user:mindmap_pass@localhost:5432/mindmap_db',
            entities: [FolderOrmEntity, MindMapOrmEntity],
            synchronize: true,
          }),
        }),
        FoldersModule,
        MindMapsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /mind-maps with valid body returns 201 and the created mind map', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/mind-maps')
      .send({ title: 'My Map' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('My Map');
    expect(res.body).not.toHaveProperty('content');
    mindMapId = res.body.id;
  });

  it('POST /mind-maps with a non-existent folderId returns 404', async () => {
    await request(app.getHttpServer())
      .post('/api/mind-maps')
      .send({
        title: 'Bad Map',
        folderId: '00000000-0000-0000-0000-000000000000',
      })
      .expect(404);
  });

  it('POST /mind-maps with a valid folderId creates map in folder', async () => {
    const folderRes = await request(app.getHttpServer())
      .post('/api/folders')
      .send({ name: 'My Folder' })
      .expect(201);
    folderId = folderRes.body.id;

    const res = await request(app.getHttpServer())
      .post('/api/mind-maps')
      .send({ title: 'Folder Map', folderId })
      .expect(201);

    expect(res.body.folderId).toBe(folderId);
  });

  it('GET /mind-maps returns 200 and an array', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/mind-maps')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    for (const item of res.body) {
      expect(item).not.toHaveProperty('content');
    }
  });

  it('GET /mind-maps?folderId=uuid filters by folder', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/mind-maps?folderId=${folderId}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    for (const item of res.body) {
      expect(item.folderId).toBe(folderId);
    }
  });

  it('GET /mind-maps/:id returns 200 with content field included', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/mind-maps/${mindMapId}`)
      .expect(200);

    expect(res.body.id).toBe(mindMapId);
    expect(res.body).toHaveProperty('content');
    expect(res.body.content).toHaveProperty('nodeData');
    expect(res.body.content.nodeData).toHaveProperty('topic');
  });

  it('PATCH /mind-maps/:id updates title', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/mind-maps/${mindMapId}`)
      .send({ title: 'Renamed Map' })
      .expect(200);

    expect(res.body.title).toBe('Renamed Map');
  });

  it('PATCH /mind-maps/:id updates content', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/mind-maps/${mindMapId}`)
      .send({
        content: {
          nodeData: {
            id: 'root-1',
            topic: 'Updated Root',
          },
        },
      })
      .expect(200);

    expect(res.body.title).toBe('Renamed Map');
  });

  it('PATCH /mind-maps/:id/move moves map to a folder', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/mind-maps/${mindMapId}/move`)
      .send({ folderId })
      .expect(200);

    expect(res.body.folderId).toBe(folderId);
  });

  it('PATCH /mind-maps/:id/move with folderId: null removes folder association', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/mind-maps/${mindMapId}/move`)
      .send({ folderId: null })
      .expect(200);

    expect(res.body.folderId).toBeNull();
  });

  it('DELETE /mind-maps/:id returns 204', async () => {
    await request(app.getHttpServer())
      .delete(`/api/mind-maps/${mindMapId}`)
      .expect(204);
  });
});