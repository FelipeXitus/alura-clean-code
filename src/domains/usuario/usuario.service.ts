import { listaCidades, listaUsuarios } from '../../constants';

export const listarUsuarios = (documento?: string) => {
    if (!documento) {
        return listaUsuarios;
    }

    const usuario = listaUsuarios.find(
        usuario => usuario.documento === documento
    );

    if (!usuario) {
        throw {
            status: 404,
            mensagem: 'Usuário não encontrado com o documento informado.'
        };
    }

    return usuario;
};

export const buscarUsuarioPorId = (id: number) => {
    const usuario = listaUsuarios.find(
        usuario => usuario.id === id
    );

    if (!usuario) {
        throw {
            status: 404,
            mensagem: 'Usuário não encontrado.'
        };
    }

    return usuario;
};

export const criarUsuario = (
    nomeCompleto: string,
    documento: string,
    endereco: any
) => {
    if (
        !nomeCompleto ||
        !documento ||
        !endereco ||
        !endereco.rua ||
        !endereco.numero ||
        !endereco.cidadeId
    ) {
        throw {
            status: 400,
            mensagem: 'Dados incompletos para o usuário.'
        };
    }

    const documentoExiste = listaUsuarios.some(
        usuario => usuario.documento === documento
    );

    if (documentoExiste) {
        throw {
            status: 409,
            mensagem: 'Documento já cadastrado.'
        };
    }

    const cidadeExiste = listaCidades.some(
        cidade => cidade.id === endereco.cidadeId
    );

    if (!cidadeExiste) {
        throw {
            status: 400,
            mensagem: 'A cidade informada não existe.'
        };
    }

    const novoUsuario = {
        id: listaUsuarios.length + 1,
        nomeCompleto,
        documento,
        endereco
    };

    listaUsuarios.push(novoUsuario);

    return novoUsuario;
};

export const atualizarUsuario = (
    id: number,
    nomeCompleto: string,
    endereco: any
) => {
    const usuario = listaUsuarios.find(
        usuario => usuario.id === id
    );

    if (!usuario) {
        throw {
            status: 404,
            mensagem: 'Usuário não encontrado.'
        };
    }

    if (!nomeCompleto || !endereco) {
        throw {
            status: 400,
            mensagem: 'Dados incompletos para atualização.'
        };
    }

    usuario.nomeCompleto = nomeCompleto;
    usuario.endereco = endereco;

    return usuario;
};

export const excluirUsuario = (id: number) => {
    const indiceUsuario = listaUsuarios.findIndex(
        usuario => usuario.id === id
    );

    if (indiceUsuario === -1) {
        throw {
            status: 404,
            mensagem: 'Usuário não encontrado.'
        };
    }

    listaUsuarios.splice(indiceUsuario, 1);
};