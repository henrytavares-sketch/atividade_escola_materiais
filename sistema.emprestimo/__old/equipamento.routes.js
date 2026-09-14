import equipamentoService from '../services/equipamento.service.js';

export const equipamentoRoutes = {
  async listar(req, res) {
    try {
      const equipamentos = await equipamentoService.listarEquipamentos();
      return res.status(200).json(equipamentos);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  },

  async buscarPorId(req, res) {
    try {
      const equipamento = await equipamentoService.buscarEquipamentoPorId(req.params.id);

      if (!equipamento) {
        return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
      }

      return res.status(200).json(equipamento);
    } catch (erro) {
      return res.status(500).json({ mensagem: erro.message });
    }
  },

  async cadastrar(req, res) {
    try {
      const equipamento = await equipamentoService.cadastrarEquipamento(req.body);
      return res.status(201).json(equipamento);
    } catch (erro) {
      return res.status(400).json({ mensagem: erro.message });
    }
  },

  async alterarDisponibilidade(req, res) {
    try {
      const equipamento = await equipamentoService.alterarDisponibilidade(
        req.params.id,
        req.body.disponivel
      );

      if (!equipamento) {
        return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
      }

      return res.status(200).json(equipamento);
    } catch (erro) {
      return res.status(400).json({ mensagem: erro.message });
    }
  }
};

export default equipamentoRoutes;
