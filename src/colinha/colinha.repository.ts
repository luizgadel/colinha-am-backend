import { Injectable } from '@nestjs/common';
import { Colinha } from './colinha.types';

@Injectable()
export class ColinhaRepository {
  private readonly registros = new Map<string, Colinha>();

  salvar(colinha: Colinha): void {
    this.registros.set(colinha.id, structuredClone(colinha));
  }

  buscarPorId(id: string): Colinha | undefined {
    const registro = this.registros.get(id);
    return registro ? structuredClone(registro) : undefined;
  }
}
