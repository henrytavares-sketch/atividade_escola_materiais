import pool from './db.js';

async function testarConexao() {
    try {
        const resultado = await pool.query('SELECT * FROM equipamentos');
        console.log(`Conexão OK. ${resultado.rows.length} equipamento(s) encontrado(s):`);
        console.table(resultado.rows);
    } catch (erro) {
        console.error('Falha ao consultar o banco:', erro.message);
    } finally {
        await pool.end();
    }
}

testarConexao();