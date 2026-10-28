import { listaCidades } from '../../constants';

interface CidadeInput {
    nomeCidade: string;
    uf: string;
}

export const listarCidades = () => {
    return listaCidades;
};

export const adicionarCidade = (dados: CidadeInput) => {
    if (!dados.nomeCidade || !dados.uf) {
        throw new Error(
            'Dados incompletos: nomeCidade e uf são obrigatórios.'
        );
    }

    const cidadeJaExiste = listaCidades.some(
        (cidade) =>
            cidade.nomeCidade.toLowerCase() === dados.nomeCidade.toLowerCase() &&
            cidade.uf.toLowerCase() === dados.uf.toLowerCase()
    );

    if (cidadeJaExiste) {
        throw new Error('Esta cidade já está cadastrada.');
    }

    const novaCidade = {
        id: listaCidades.length + 1,
        nomeCidade: dados.nomeCidade,
        uf: dados.uf,
    };

    listaCidades.push(novaCidade);

    return novaCidade;
};