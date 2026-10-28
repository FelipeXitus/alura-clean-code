type ModeloCidade = {
	id: number;
	nomeCidade: string;
	uf: string;
};

type ModeloUsuario = {
	id: number;
	nomeCompleto: string;
	documento: string;
	endereco: {
		rua: string;
		numero: number;
		cidadeId: number;
	};
};

export { ModeloCidade, ModeloUsuario };