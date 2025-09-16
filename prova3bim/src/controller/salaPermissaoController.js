import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as salaRepo from '../repository/salaRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {

    const salaid = req.params.sala
    const usuarioId = req.user.id  
    const permissao = false

    await salaPermissaoRepo.inserirPermissao(salaid, usuarioId, permissao)

});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    const salaid = req.params.sala;
    const usuarioId = req.params.usuario;
    const usuarioLogadoId = req.user.id;

    const sala = await salaRepo.buscarSalaPorId(salaid);
 
    if (!sala || sala.usuario_id !== usuarioLogadoId) {
        return resp.status(403).send({ error: 'Apenas o criador da sala pode permitir aprovação' });
    }

    const aprovado = await salaPermissaoRepo.aprovarPermissao(salaid, usuarioId);

    if (aprovado) {
        resp.send({ message: 'Permissão aprovada' });
    } else {
        resp.status(404).send({ error: 'Permissão recusada' });
    }
});



export default endpoints;