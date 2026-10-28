import { Request, Response } from 'express';
import * as usuarioService from './usuario.service';

export const listarUsuarios = (req: Request, res: Response) => {
    try {
        const documento = req.query.documento as string | undefined;

        const usuarios = usuarioService.listarUsuarios(documento);

        return res.status(200).json(usuarios);
    } catch (erro: any) {
        return res.status(erro.status).json({
            erro: erro.mensagem
        });
    }
};

export const buscarUsuarioPorId = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const usuario = usuarioService.buscarUsuarioPorId(id);

        return res.status(200).json(usuario);
    } catch (erro: any) {
        return res.status(erro.status).json({
            erro: erro.mensagem
        });
    }
};

export const criarUsuario = (req: Request, res: Response) => {
    try {
        const { nomeCompleto, documento, endereco } = req.body;

        const novoUsuario = usuarioService.criarUsuario(
            nomeCompleto,
            documento,
            endereco
        );

        return res.status(201).json(novoUsuario);
    } catch (erro: any) {
        return res.status(erro.status).json({
            erro: erro.mensagem
        });
    }
};

export const atualizarUsuario = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { nomeCompleto, endereco } = req.body;

        const usuario = usuarioService.atualizarUsuario(
            id,
            nomeCompleto,
            endereco
        );

        return res.status(200).json(usuario);
    } catch (erro: any) {
        return res.status(erro.status).json({
            erro: erro.mensagem
        });
    }
};

export const excluirUsuario = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        usuarioService.excluirUsuario(id);

        return res.status(204).send();
    } catch (erro: any) {
        return res.status(erro.status).json({
            erro: erro.mensagem
        });
    }
};