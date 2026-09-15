import pool from './src/database/db.js';

async function testarConexao() {
    try {
        console.log('DB_NAME lido:', process.env.DB_NAME);
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