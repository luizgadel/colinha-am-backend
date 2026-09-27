export const CHAVES_NUMERO = ['df', 'de', 's1', 's2', 'gov', 'pr'] as const;

export const COMENTARIO_DO_SLOT = {
  df: 'cdf',
  de: 'cde',
  s1: 'cs1',
  s2: 'cs2',
  gov: 'cgov',
  pr: 'cpr',
} as const;

export type ChaveNumero = (typeof CHAVES_NUMERO)[number];
export type ChaveComentario = (typeof COMENTARIO_DO_SLOT)[ChaveNumero];

export const LIMITE_COMENTARIO = 210;

export type Colinha = { id: string } & Record<ChaveNumero | ChaveComentario, string | null>;

export type EntradaColinha = Partial<Record<ChaveNumero | ChaveComentario, unknown>>;
