import type { Cidade } from './domains/cidades/cidade.model';
import type { Usuario } from './domains/usuarios/usuario.model';

export const listaCidades: Cidade[] = [
	{ id: 1, nomeCidade: 'Propriá', uf: 'SE' },
	{ id: 2, nomeCidade: 'Aracaju', uf: 'SE' },
];

export const listaUsuarios: Usuario[] = [
	{
		id: 1,
		nomeCompleto: 'Fulano de Tal',
		documento: '11122233344',
		endereco: { rua: 'Rua A', numero: 10, cidadeId: 1 },
	},
];