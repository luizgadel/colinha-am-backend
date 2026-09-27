import { Injectable, NotFoundException } from '@nestjs/common';
import { ColinhaRepository } from './colinha.repository';
import { identificadorCurto } from './identificador';
import { CHAVES_NUMERO, Colinha, EntradaColinha } from './colinha.types';

@Injectable()
export class ColinhaService {
  constructor(private readonly repositorio: ColinhaRepository) {}

  criar(entrada: EntradaColinha): Colinha {
    const colinha = this.montar(this.novoId(), entrada);
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

  private novoId(): string {
    for (let tentativa = 0; tentativa < 5; tentativa += 1) {
      const id = identificadorCurto();
      if (!this.repositorio.buscarPorId(id)) {
        return id;
      }
    }
    throw new Error('Não foi possível gerar um identificador');
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
