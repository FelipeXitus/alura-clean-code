export interface Endereco {
    rua: string;
    numero: number;
    cidadeId: number;
}

export interface Usuario {
    id: number;
    nomeCompleto: string;
    documento: string;
    endereco: Endereco;
}

export type CriarUsuarioInput = Omit<Usuario, 'id'>;

export type AtualizarUsuarioInput = Partial<
    Pick<Usuario, 'nomeCompleto' | 'endereco'>
>;