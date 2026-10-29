import { listaCidades, listaUsuarios } from '../../constants';
import { AppError } from '../../shared/errors/app-error';

import type {
    AtualizarUsuarioInput,
    CriarUsuarioInput,
    Endereco,
    Usuario,
} from './usuario.model';

const gerarProximoId = (): number => {
    const maiorId = listaUsuarios.reduce(
        (idAtual, usuario) => Math.max(idAtual, usuario.id),
        0
    );

    return maiorId + 1;
};

const copiarEndereco = (endereco: Endereco): Endereco => {
    return { ...endereco };
};

const copiarUsuario = (usuario: Usuario): Usuario => {
    return {
        ...usuario,
        endereco: copiarEndereco(usuario.endereco),
    };
};

const validarId = (id: number): void => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new AppError(
            'O ID do usuário deve ser um número inteiro positivo.',
            400
        );
    }
};

const validarDocumento = (documento: unknown): string => {
    if (typeof documento !== 'string' || documento.trim() === '') {
        throw new AppError(
            'O documento é obrigatório e deve ser uma string.',
            400
        );
    }

    return documento.trim();
};

const validarEndereco = (endereco: unknown): Endereco => {
    if (typeof endereco !== 'object' || endereco === null) {
        throw new AppError(
            'O endereço é obrigatório e deve ser um objeto.',
            400
        );
    }

    const {
        rua,
        numero,
        cidadeId,
    } = endereco as Record<string, unknown>;

    if (typeof rua !== 'string' || rua.trim() === '') {
        throw new AppError(
            'A rua é obrigatória e deve ser uma string.',
            400
        );
    }

    if (
        typeof numero !== 'number' ||
        !Number.isInteger(numero) ||
        numero <= 0
    ) {
        throw new AppError(
            'O número do endereço deve ser um número inteiro positivo.',
            400
        );
    }

    if (
        typeof cidadeId !== 'number' ||
        !Number.isInteger(cidadeId) ||
        cidadeId <= 0
    ) {
        throw new AppError(
            'O cidadeId deve ser um número inteiro positivo.',
            400
        );
    }

    const cidadeExiste = listaCidades.some(
        (cidade) => cidade.id === cidadeId
    );

    if (!cidadeExiste) {
        throw new AppError(
            'A cidade informada não existe.',
            400
        );
    }

    return {
        rua: rua.trim(),
        numero,
        cidadeId,
    };
};

const validarCriacao = (
    dados: unknown
): CriarUsuarioInput => {
    if (typeof dados !== 'object' || dados === null) {
        throw new AppError(
            'O corpo da requisição é inválido.',
            400
        );
    }

    const {
        nomeCompleto,
        documento,
        endereco,
    } = dados as Record<string, unknown>;

    if (
        typeof nomeCompleto !== 'string' ||
        nomeCompleto.trim() === ''
    ) {
        throw new AppError(
            'O nomeCompleto é obrigatório e deve ser uma string.',
            400
        );
    }

    return {
        nomeCompleto: nomeCompleto.trim(),
        documento: validarDocumento(documento),
        endereco: validarEndereco(endereco),
    };
};

const validarAtualizacao = (
    dados: unknown
): AtualizarUsuarioInput => {
    if (typeof dados !== 'object' || dados === null) {
        throw new AppError(
            'O corpo da requisição é inválido.',
            400
        );
    }

    const {
        nomeCompleto,
        endereco,
    } = dados as Record<string, unknown>;

    if (nomeCompleto === undefined && endereco === undefined) {
        throw new AppError(
            'Informe pelo menos um campo para atualização.',
            400
        );
    }

    const entrada: AtualizarUsuarioInput = {};

    if (nomeCompleto !== undefined) {
        if (
            typeof nomeCompleto !== 'string' ||
            nomeCompleto.trim() === ''
        ) {
            throw new AppError(
                'O nomeCompleto deve ser uma string válida.',
                400
            );
        }

        entrada.nomeCompleto = nomeCompleto.trim();
    }

    if (endereco !== undefined) {
        entrada.endereco = validarEndereco(endereco);
    }

    return entrada;
};

export const listarUsuarios = (
    documento?: unknown
): Usuario[] => {
    if (documento === undefined) {
        return listaUsuarios.map(copiarUsuario);
    }

    const documentoValidado = validarDocumento(documento);

    const usuariosEncontrados = listaUsuarios.filter(
        (usuario) => usuario.documento === documentoValidado
    );

    if (usuariosEncontrados.length === 0) {
        throw new AppError(
            'Usuário não encontrado com o documento informado.',
            404
        );
    }

    return usuariosEncontrados.map(copiarUsuario);
};

export const buscarUsuarioPorId = (
    id: number
): Usuario => {
    validarId(id);

    const usuario = listaUsuarios.find(
        (usuarioAtual) => usuarioAtual.id === id
    );

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    return copiarUsuario(usuario);
};

export const criarUsuario = (
    dados: unknown
): Usuario => {
    const entrada = validarCriacao(dados);

    const documentoExiste = listaUsuarios.some(
        (usuario) => usuario.documento === entrada.documento
    );

    if (documentoExiste) {
        throw new AppError('Documento já cadastrado.', 409);
    }

    const novoUsuario: Usuario = {
        id: gerarProximoId(),
        nomeCompleto: entrada.nomeCompleto,
        documento: entrada.documento,
        endereco: copiarEndereco(entrada.endereco),
    };

    listaUsuarios.push(novoUsuario);

    return copiarUsuario(novoUsuario);
};

export const atualizarUsuario = (
    id: number,
    dados: unknown
): Usuario => {
    validarId(id);

    const entrada = validarAtualizacao(dados);

    const usuario = listaUsuarios.find(
        (usuarioAtual) => usuarioAtual.id === id
    );

    if (!usuario) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    if (entrada.nomeCompleto !== undefined) {
    usuario.nomeCompleto = entrada.nomeCompleto;
    }

    if (entrada.endereco !== undefined) {
        usuario.endereco = copiarEndereco(entrada.endereco);
    }

    return copiarUsuario(usuario);
};

export const excluirUsuario = (id: number): void => {
    validarId(id);

    const indiceUsuario = listaUsuarios.findIndex(
        (usuario) => usuario.id === id
    );

    if (indiceUsuario === -1) {
        throw new AppError('Usuário não encontrado.', 404);
    }

    listaUsuarios.splice(indiceUsuario, 1);
};