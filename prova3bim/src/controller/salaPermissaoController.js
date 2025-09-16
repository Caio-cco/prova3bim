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
       
    const salaid = req.params.sala
    const aprovado = req.params.aprovar
    let usuarioLogadoId = req.user.id

    if(!aprovado){
        
    }
    

});



export default endpoints;