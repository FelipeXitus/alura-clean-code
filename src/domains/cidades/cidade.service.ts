import { listaCidades } from '../../constants';
import { AppError } from '../../shared/errors/app-error';
import type { Cidade, CriarCidadeInput } from './cidade.model';

const normalizarTexto = (valor: string): string => {
    return valor.trim().toLocaleLowerCase('pt-BR');
};

const gerarProximoId = (): number => {
    const maiorId = listaCidades.reduce(
        (idAtual, cidade) => Math.max(idAtual, cidade.id),
        0
    );

    return maiorId + 1;
};

const validarEntrada = (
    dados: unknown
): CriarCidadeInput => {
    if (typeof dados !== 'object' || dados === null) {
        throw new AppError('O corpo da requisição é inválido.', 400);
    }

    const { nomeCidade, uf } = dados as Record<string, unknown>;

    if (typeof nomeCidade !== 'string' || nomeCidade.trim() === '') {
        throw new AppError(
            'O campo nomeCidade é obrigatório e deve ser uma string.',
            400
        );
    }

    if (typeof uf !== 'string' || !/^[A-Za-z]{2}$/.test(uf.trim())) {
        throw new AppError(
            'O campo uf deve conter exatamente duas letras.',
            400
        );
    }

    return {
        nomeCidade: nomeCidade.trim(),
        uf: uf.trim().toUpperCase(),
    };
};

export const listarCidades = (): Cidade[] => {
    return listaCidades.map((cidade) => ({ ...cidade }));
};

export const adicionarCidade = (
    entrada: CriarCidadeInput
): Cidade => {
    const cidadeJaExiste = listaCidades.some((cidade) => {
        const mesmoNome =
            normalizarTexto(cidade.nomeCidade) ===
            normalizarTexto(entrada.nomeCidade);

        const mesmaUf =
            cidade.uf.toUpperCase() === entrada.uf;

        return mesmoNome && mesmaUf;
    });

    if (cidadeJaExiste) {
        throw new AppError(
            'Esta cidade já está cadastrada.',
            409
        );
    }

    const novaCidade: Cidade = {
        id: gerarProximoId(),
        nomeCidade: entrada.nomeCidade,
        uf: entrada.uf,
    };

    listaCidades.push(novaCidade);

    return { ...novaCidade };
};