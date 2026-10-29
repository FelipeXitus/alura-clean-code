import { AppError } from '../../shared/errors/app-error';
import type { CriarCidadeInput } from './cidade.model';

export const validarCriacaoCidade = (
    dados: unknown
): CriarCidadeInput => {
    if (typeof dados !== 'object' || dados === null) {
        throw new AppError(
            'O corpo da requisição é inválido.',
            400
        );
    }

    const { nomeCidade, uf } =
        dados as Record<string, unknown>;

    if (
        typeof nomeCidade !== 'string' ||
        nomeCidade.trim() === ''
    ) {
        throw new AppError(
            'O campo nomeCidade é obrigatório e deve ser uma string.',
            400
        );
    }

    if (
        typeof uf !== 'string' ||
        !/^[A-Za-z]{2}$/.test(uf.trim())
    ) {
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