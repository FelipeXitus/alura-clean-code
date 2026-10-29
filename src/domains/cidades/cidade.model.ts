export interface Cidade {
	id: number;
	nomeCidade: string;
	uf: string;
};

export type CriarCidadeInput = Omit<Cidade, 'id'>;