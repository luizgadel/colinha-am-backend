export const CHAVES_NUMERO = ['df', 'de', 's1', 's2', 'gov', 'pr'] as const;

export type ChaveNumero = (typeof CHAVES_NUMERO)[number];

export type Colinha = { id: string } & Record<ChaveNumero, string | null>;

export type EntradaColinha = Partial<Record<ChaveNumero, unknown>>;
