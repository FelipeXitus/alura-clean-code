import { Request, Response } from 'express';
import * as cidadeService from './cidade.service';

export const listarCidades = (req: Request, res: Response) => {
    const cidades = cidadeService.listarCidades();

    return res.status(200).json(cidades);
};

export const adicionarCidade = (req: Request, res: Response) => {
    try {
        const novaCidade = cidadeService.adicionarCidade(req.body);

        return res.status(201).json(novaCidade);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ erro: error.message });
        }

        return res.status(500).json({ erro: 'Erro interno.' });
    }
};