import express, { type Router, type Request, type Response } from 'express';
import { listaCidades } from '../../constants';

const router:Router = express.Router();

const listarCidades = (req: Request, res: Response) => {
    res.status(200).json(listaCidades);
};


const adicionarCidade = (req: Request, res: Response) => {
    const dados = req.body;

    if (!dados.nomeCidade || !dados.uf) {
        return res.status(400).send({ erro: 'Dados incompletos: nomeCidade e uf são obrigatórios.' });
    }

    for (let i = 0; i < listaCidades.length; i++) {
        if (listaCidades[i].nomeCidade.toLowerCase() === dados.nomeCidade.toLowerCase() && listaCidades[i].uf.toLowerCase() === dados.uf.toLowerCase()) {
            return res.status(409).send({ erro: 'Esta cidade já está cadastrada.' });
        }
    }

    let contadorCidade = listaCidades.length;

    contadorCidade = contadorCidade + 1;
    const novaCoisa = {
        id: contadorCidade,
        nomeCidade: dados.nomeCidade,
        uf: dados.uf,
    };

    listaCidades.push(novaCoisa); // Adiciona na lista.

    res.status(201).json(novaCoisa);
};

export { listarCidades, adicionarCidade };