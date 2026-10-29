import type {
    ErrorRequestHandler
} from 'express';

import { AppError } from '../errors/app-error';

export const errorHandler: ErrorRequestHandler = (
    error: unknown,
    _req,
    res,
    _next
): void => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            erro: error.message,
        });

        return;
    }

    console.error(error);

    res.status(500).json({
        erro: 'Erro interno do servidor.',
    });
};