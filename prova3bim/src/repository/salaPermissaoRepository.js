import { connection } from './connection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    const comando = `
     INSERT INTO salaPermissao (sala_id, usuario_id, aprovado) 
                VALUES (?, ?, ?);
    `
    const [info] = await connection.query(comando, [salaId, usuarioId, aprovado])
    return info.insertId 
}


export async function aprovarPermissao(salaId, usuarioId) {
    const comando =`
      update salaPermissao
         set aprovado = TRUE
         where sala_id and usuario_id = ?;
    `

    const [info] = await connection.query(comando, [salaId, usuarioId])

}


export async function verificarPermissaoSala(salaId, usuarioId) {
    const comando = `
    SELECT id 
        FROM sala 
        WHERE sala_id = ? AND usuario_id = ? AND aprovado = TRUE;
    `
    const [info] = await connection.query(comando, [salaId, usuarioId])
}