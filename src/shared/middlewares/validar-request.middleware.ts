import type {
    Request,
    Response,
    NextFunction,
} from 'express';

import {
    validarCriacaoCidade,
} from '../../domains/cidades/cidade.validation';

import {
    validarAtualizacaoUsuario,
    validarCriacaoUsuario,
    validarDocumentoUsuario,
    validarIdUsuario,
} from '../../domains/usuarios/usuario.validation';

export const validarCidade = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    req.body = validarCriacaoCidade(req.body);
    next();
};

export const validarCriacaoUsuarioMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    req.body = validarCriacaoUsuario(req.body);
    next();
};

export const validarAtualizacaoUsuarioMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    req.body = validarAtualizacaoUsuario(req.body);
    next();
};

export const validarIdUsuarioMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    validarIdUsuario(req.params.id);
    next();
};

export const validarDocumentoUsuarioMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    if (req.query.documento !== undefined) {
        validarDocumentoUsuario(req.query.documento);
    }

    next();
};