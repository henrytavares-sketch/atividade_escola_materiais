import pool from '../database/db.js';

class EquipamentoService {
  async listarEquipamentos() {
    const { rows } = await pool.query(
      `SELECT id, nome, categoria, condicao, disponivel
       FROM equipamentos
       ORDER BY id;`
    );

    return rows;
  }

  async buscarEquipamentoPorId(id) {
    const identificador = Number(id);

    if (!Number.isInteger(identificador) || identificador <= 0) {
      return null;
    }

    const { rows } = await pool.query(
      `SELECT id, nome, categoria, condicao, disponivel
       FROM equipamentos
       WHERE id = $1;`,
      [identificador]
    );

    return rows[0] ?? null;
  }

  async cadastrarEquipamento({ nome, categoria, condicao, disponivel }) {
    const nomeFormatado = typeof nome === 'string' ? nome.trim() : '';
    const categoriaFormatada = typeof categoria === 'string' ? categoria.trim() : '';
    const condicaoFormatada = typeof condicao === 'string' ? condicao.trim() : '';

    if (!nomeFormatado || !categoriaFormatada || !condicaoFormatada) {
      throw new Error('Nome, categoria e condição são obrigatórios.');
    }

    const { rows } = await pool.query(
      `INSERT INTO equipamentos (nome, categoria, condicao, disponivel)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, categoria, condicao, disponivel;`,
      [nomeFormatado, categoriaFormatada, condicaoFormatada, Boolean(disponivel)]
    );

    return rows[0];
  }

  async alterarDisponibilidade(id, disponivel) {
    const identificador = Number(id);

    if (!Number.isInteger(identificador) || identificador <= 0) {
      return null;
    }

    const { rows } = await pool.query(
      `UPDATE equipamentos
       SET disponivel = $2
       WHERE id = $1
       RETURNING id, nome, categoria, condicao, disponivel;`,
      [identificador, Boolean(disponivel)]
    );

    return rows[0] ?? null;
  }
}

export const equipamentoService = new EquipamentoService();
