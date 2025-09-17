import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as chatRepo from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();

endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    
        const usuarioId = req.user.id
        const salaId = req.params.sala
        const { mensagem } = req.body

        
        const temPermissao = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioId);

        if (temPermissao.length === 0) {

            return resp.status(403).send({ erro: 'Permissão para a sala negado!' })
        }

        const idmensagem = await chatRepo.inserirMensagem(usuarioId, salaId, mensagem)
        resp.send({ id: idmensagem, mensagem, usuarioId, salaId })
    
});

endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
    
        const usuarioId = req.user.id
        const salaId = req.params.sala

        
        const permissao = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioId)
        if (permissao.length === 0) {

            return resp.status(403).send({ erro: 'Permissão para a sala negado!' })
        }

        const mensagens = await chatRepo.listarMensagensPorSala(salaId)
        resp.send(mensagens)
   
});

export default endpoints