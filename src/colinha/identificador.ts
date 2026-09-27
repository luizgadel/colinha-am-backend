import { randomBytes } from 'node:crypto';

export const ALFABETO_IDENTIFICADOR =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const TAMANHO_IDENTIFICADOR = 8;

const LIMITE_SEM_VIES = ALFABETO_IDENTIFICADOR.length * 4;

export function identificadorCurto(): string {
  let id = '';
  while (id.length < TAMANHO_IDENTIFICADOR) {
    const bytes = randomBytes(TAMANHO_IDENTIFICADOR);
    for (const byte of bytes) {
      if (byte >= LIMITE_SEM_VIES) {
        continue;
      }
      id += ALFABETO_IDENTIFICADOR[byte % ALFABETO_IDENTIFICADOR.length];
      if (id.length === TAMANHO_IDENTIFICADOR) {
        break;
      }
    }
  }
  return id;
}
