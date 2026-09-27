import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ColinhaRepository } from './colinha.repository';
import { CHAVES_NUMERO, Colinha, EntradaColinha } from './colinha.types';

@Injectable()
export class ColinhaService {
  constructor(private readonly repositorio: ColinhaRepository) {}

  criar(entrada: EntradaColinha): Colinha {
    const colinha = this.montar(randomUUID(), entrada);
    this.repositorio.salvar(colinha);
    return colinha;
  }

  buscar(id: string): Colinha {
    const colinha = this.repositorio.buscarPorId(id);
    if (!colinha) {
      throw new NotFoundException('Colinha não encontrada');
    }
    return colinha;
  }

  atualizar(id: string, entrada: EntradaColinha): Colinha {
    this.buscar(id);
    const colinha = this.montar(id, entrada);
    this.repositorio.salvar(colinha);
    return colinha;
  }

  private montar(id: string, entrada: EntradaColinha): Colinha {
    const colinha = { id } as Colinha;
    for (const chave of CHAVES_NUMERO) {
      colinha[chave] = numeroDoSlot(entrada[chave]);
    }
    return colinha;
  }
}

function numeroDoSlot(valor: unknown): string | null {
  if (typeof valor !== 'string') {
    return null;
  }
  const texto = valor.trim();
  return texto.length === 0 ? null : texto;
}
