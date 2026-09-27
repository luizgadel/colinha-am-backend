import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TAMANHO_IDENTIFICADOR } from '../src/colinha/identificador';

describe('API de colinhas (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('expõe criar, ler e atualizar sem autenticação', async () => {
    const criada = await request(app.getHttpServer())
      .post('/colinhas')
      .send({ df: '10123', de: '', gov: '40' })
      .expect(201);

    expect(criada.body.id).toHaveLength(TAMANHO_IDENTIFICADOR);

    const lida = await request(app.getHttpServer())
      .get(`/colinhas/${criada.body.id}`)
      .expect(200);

    expect(lida.body).toMatchObject({
      id: criada.body.id,
      df: '10123',
      de: null,
      gov: '40',
    });

    const atualizada = await request(app.getHttpServer())
      .put(`/colinhas/${criada.body.id}`)
      .send({ pr: '13' })
      .expect(200);

    expect(atualizada.body).toMatchObject({
      id: criada.body.id,
      df: null,
      pr: '13',
    });
  });

  it('recusa comentário com mais de 210 caracteres', async () => {
    await request(app.getHttpServer())
      .post('/colinhas')
      .send({ df: '10123', cdf: 'a'.repeat(211) })
      .expect(400);
  });
});
