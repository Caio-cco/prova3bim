import { connection } from './connection.js';

export async function inserirMensagem(usuarioId, salaId, mensagem) {
    const comando = `
        insert into chat (usuario_id, sala_id, mensagem, data_envio)
                values (?, ?, ?, now());
    `
    const [info] = await connection.query(comando, [usuarioId, salaId, mensagem])
    return info.insertId
}

export async function listarMensagensPorSala(salaId) {
    const comando = `
        select c.id, c.mensagem, c.data_envio, u.nome as usuario
            from chat c
            join usuario u ON u.id = c.usuario_id
            where c.sala_id = ?
            order by c.data_envio ASC;
    `;
    const [linhas] = await connection.query(comando, [salaId])
    return linhas
}