import { connection } from './connection.js';


export async function inserirSala(nome, usuarioId) {
    const comando = `
     insert into sala (nome, usuario_id)
            values(?,?)     
    `
    
    const [info] = await connection.query(comando, [
        nome,
        usuarioId
    ])
    return info.insertId 
}


export async function buscarSalaPorId(salaId) {
    const comando = `
        SELECT id, nome, usuario_id
          FROM sala
         WHERE id = ?;
    `;
    const [linhas] = await connection.query(comando, [salaId]);
    return linhas[0]; 
}

