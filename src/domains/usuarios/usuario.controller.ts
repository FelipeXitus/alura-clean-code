import type {
    NextFunction,
    Request,
    Response,
} from 'express';

import * as usuarioService from './usuario.service';

export const listarUsuarios = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const usuarios = usuarioService.listarUsuarios(
            req.query.documento
        );

        res.status(200).json(usuarios);
    } catch (error: unknown) {
        next(error);
    }
};

export const buscarUsuarioPorId = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = Number(req.params.id);

        const usuario = usuarioService.buscarUsuarioPorId(id);

        res.status(200).json(usuario);
    } catch (error: unknown) {
        next(error);
    }
};

export const criarUsuario = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const novoUsuario = usuarioService.criarUsuario(
            req.body
        );

        res.status(201).json(novoUsuario);
    } catch (error: unknown) {
        next(error);
    }
};

export const atualizarUsuario = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = Number(req.params.id);

        const usuarioAtualizado =
            usuarioService.atualizarUsuario(
                id,
                req.body
            );

        res.status(200).json(usuarioAtualizado);
    } catch (error: unknown) {
        next(error);
    }
};

export const excluirUsuario = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = Number(req.params.id);

        usuarioService.excluirUsuario(id);

        res.status(204).send();
    } catch (error: unknown) {
        next(error);
    }
};