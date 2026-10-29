import type {
    NextFunction,
    Request,
    Response
} from 'express';

import * as cidadeService from './cidade.service';

export const listarCidades = (
    _req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const cidades = cidadeService.listarCidades();

        res.status(200).json(cidades);
    } catch (error: unknown) {
        next(error);
    }
};

export const adicionarCidade = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const novaCidade = cidadeService.adicionarCidade(req.body);

        res.status(201).json(novaCidade);
    } catch (error: unknown) {
        next(error);
    }
};