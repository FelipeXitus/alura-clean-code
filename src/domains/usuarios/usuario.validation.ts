import { AppError } from "../../shared/errors/app-error";
import type {
  AtualizarUsuarioInput,
  CriarUsuarioInput,
  Endereco,
} from "./usuario.model";

const validarObjeto = (
  dados: unknown,
  mensagem: string,
): Record<string, unknown> => {
  if (typeof dados !== "object" || dados === null || Array.isArray(dados)) {
    throw new AppError(mensagem, 400);
  }
  return dados as Record<string, unknown>;
};
export const validarIdUsuario = (valor: unknown): number => {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(
      "O ID do usuário deve ser um número inteiro positivo.",
      400,
    );
  }
  return id;
};
export const validarDocumentoUsuario = (documento: unknown): string => {
  if (typeof documento !== "string" || documento.trim() === "") {
    throw new AppError("O documento é obrigatório e deve ser uma string.", 400);
  }
  return documento.trim();
};
const validarNomeCompleto = (nomeCompleto: unknown): string => {
  if (typeof nomeCompleto !== "string" || nomeCompleto.trim() === "") {
    throw new AppError(
      "O nomeCompleto é obrigatório e deve ser uma string.",
      400,
    );
  }
  return nomeCompleto.trim();
};
const validarEndereco = (endereco: unknown): Endereco => {
  const dadosEndereco = validarObjeto(
    endereco,
    "O endereço é obrigatório e deve ser um objeto.",
  );
  const { rua, numero, cidadeId } = dadosEndereco;
  if (typeof rua !== "string" || rua.trim() === "") {
    throw new AppError("A rua é obrigatória e deve ser uma string.", 400);
  }
  if (typeof numero !== "number" || !Number.isInteger(numero) || numero <= 0) {
    throw new AppError(
      "O número do endereço deve ser um número inteiro positivo.",
      400,
    );
  }
  if (
    typeof cidadeId !== "number" ||
    !Number.isInteger(cidadeId) ||
    cidadeId <= 0
  ) {
    throw new AppError("O cidadeId deve ser um número inteiro positivo.", 400);
  }
  return { rua: rua.trim(), numero, cidadeId };
};
export const validarCriacaoUsuario = (dados: unknown): CriarUsuarioInput => {
  const entrada = validarObjeto(dados, "O corpo da requisição é inválido.");
  const { nomeCompleto, documento, endereco } = entrada;
  return {
    nomeCompleto: validarNomeCompleto(nomeCompleto),
    documento: validarDocumentoUsuario(documento),
    endereco: validarEndereco(endereco),
  };
};
export const validarAtualizacaoUsuario = (
  dados: unknown,
): AtualizarUsuarioInput => {
  const entrada = validarObjeto(dados, "O corpo da requisição é inválido.");
  const { nomeCompleto, endereco } = entrada;
  if (nomeCompleto === undefined && endereco === undefined) {
    throw new AppError(
      "Informe nomeCompleto ou endereco para atualizar o usuário.",
      400,
    );
  }
  const dadosValidados: AtualizarUsuarioInput = {};
  if (nomeCompleto !== undefined) {
    dadosValidados.nomeCompleto = validarNomeCompleto(nomeCompleto);
  }
  if (endereco !== undefined) {
    dadosValidados.endereco = validarEndereco(endereco);
  }
  return dadosValidados;
};
