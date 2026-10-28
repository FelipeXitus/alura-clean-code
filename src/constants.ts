import {ModeloCidade, ModeloUsuario} from './models/models';

const listaCidades: ModeloCidade[] = [
	{ id: 1, nomeCidade: 'Propriá', uf: 'SE' },
	{ id: 2, nomeCidade: 'Aracaju', uf: 'SE' },
];

const listaUsuarios: ModeloUsuario[] = [
	{
		id: 1,
		nomeCompleto: 'Fulano de Tal',
		documento: '11122233344',
		endereco: { rua: 'Rua A', numero: 10, cidadeId: 1 },
	},
];

export { listaCidades, listaUsuarios };