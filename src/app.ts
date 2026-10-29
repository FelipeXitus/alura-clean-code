import express from 'express';

import { cidadeRouter } from './domains/cidades/cidade.route';
import { usuarioRouter } from './domains/usuarios/usuario.route';
import { errorHandler } from './shared/middlewares/error-handler';
import { logger } from './shared/middlewares/logger';

export const app = express();

app.use(express.json());
app.use(logger);

app.use('/cidades', cidadeRouter);
app.use('/usuarios', usuarioRouter);

app.use(errorHandler);