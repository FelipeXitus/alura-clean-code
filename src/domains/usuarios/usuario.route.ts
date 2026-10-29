import { Router } from 'express';

import {
    atualizarUsuario,
    buscarUsuarioPorId,
    criarUsuario,
    excluirUsuario,
    listarUsuarios,
} from './usuario.controller';

import {
    validarAtualizacaoUsuarioMiddleware,
    validarCriacaoUsuarioMiddleware,
    validarDocumentoUsuarioMiddleware,
    validarIdUsuarioMiddleware,
} from '../../shared/middlewares/validar-request.middleware';

export const usuarioRouter = Router();

usuarioRouter
    .route('/')
    .get(
        validarDocumentoUsuarioMiddleware,
        listarUsuarios
    )
    .post(
        validarCriacaoUsuarioMiddleware,
        criarUsuario
    );

usuarioRouter
    .route('/:id')
    .get(
        validarIdUsuarioMiddleware,
        buscarUsuarioPorId
    )
    .patch(
        validarIdUsuarioMiddleware,
        validarAtualizacaoUsuarioMiddleware,
        atualizarUsuario
    )
    .delete(
        validarIdUsuarioMiddleware,
        excluirUsuario
    );