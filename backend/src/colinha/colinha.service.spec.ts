import { Test } from '@nestjs/testing';
import { ColinhaRepository } from './colinha.repository';
import { ColinhaService } from './colinha.service';

describe('ColinhaService', () => {
  let service: ColinhaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ColinhaService, ColinhaRepository],
    }).compile();

    service = moduleRef.get(ColinhaService);
  });

  it('cria, lê e atualiza os números sem conta de usuário', () => {
    const criada = service.criar({
      df: '10123',
      de: '   ',
      s1: null,
      gov: '40',
    });

    expect(criada.id).toEqual(expect.any(String));
    expect(criada.id.length).toBeGreaterThan(0);
    expect(criada).toMatchObject({
      df: '10123',
      de: null,
      s1: null,
      s2: null,
      gov: '40',
      pr: null,
    });
    expect(service.buscar(criada.id)).toEqual(criada);

    const atualizada = service.atualizar(criada.id, { pr: '13' });

    expect(atualizada.id).toBe(criada.id);
    expect(atualizada).toMatchObject({
      df: null,
      de: null,
      s1: null,
      s2: null,
      gov: null,
      pr: '13',
    });
  });
});
