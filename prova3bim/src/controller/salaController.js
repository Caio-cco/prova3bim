import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaRepo from '../repository/salaRepository.js';
import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/sala', autenticador, async (req, resp) => {
    
        const {nome} = req.body
        const usuarioId = req.user.id  
        const permissao = true

        const id = await salaRepo.inserirSala(nome, usuarioId)
        await salaPermissaoRepo.inserirPermissao(id, usuarioId, permissao)

        resp.send({ novaSala: id })
    
     
})

export default endpoints;