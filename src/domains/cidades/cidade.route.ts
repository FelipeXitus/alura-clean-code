import { Router } from 'express';

import {
    adicionarCidade,
    listarCidades,
} from './cidade.controller';

import { validarCidade }
    from '../../shared/middlewares/validar-request.middleware';

export const cidadeRouter = Router();

cidadeRouter
    .route('/')
    .get(listarCidades)
    .post(validarCidade, adicionarCidade);