import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { FolderOrmEntity } from '../infrastructure/database/entities/folder.orm-entity';
import { MindMapOrmEntity } from '../infrastructure/database/entities/mind-map.orm-entity';
import { FoldersModule } from '../folders/folders.module';

describe('Folders (e2e)', () => {
  let app: INestApplication;

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

  let createdId: string;

  it('POST /folders with valid body returns 201 and the created folder', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/folders')
      .send({ name: 'Test Folder' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Folder');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
    createdId = res.body.id;
  });

  it('POST /folders with empty name returns 400', async () => {
    await request(app.getHttpServer())
      .post('/api/folders')
      .send({ name: '' })
      .expect(400);
  });

  it('GET /folders returns 200 and an array', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/folders')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('PATCH /folders/:id with a valid name returns 200 and updated folder', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/api/folders/${createdId}`)
      .send({ name: 'Renamed Folder' })
      .expect(200);

    expect(res.body.name).toBe('Renamed Folder');
  });

  it('PATCH /folders/:id with non-existent id returns 404', async () => {
    await request(app.getHttpServer())
      .patch('/api/folders/00000000-0000-0000-0000-000000000000')
      .send({ name: 'Nope' })
      .expect(404);
  });

  it('DELETE /folders/:id returns 204', async () => {
    await request(app.getHttpServer())
      .delete(`/api/folders/${createdId}`)
      .expect(204);
  });

  it('DELETE /folders/:id with non-existent id returns 404', async () => {
    await request(app.getHttpServer())
      .delete('/api/folders/00000000-0000-0000-0000-000000000000')
      .expect(404);
  });
});