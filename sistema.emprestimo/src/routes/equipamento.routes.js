import express from 'express';
import { equipamentoService } from '../services/equipamento.service.js';

const EquipamentoRouter = express.Router();

EquipamentoRouter.get('/', async (req, res) => {
  try {
    const equipamentos = await equipamentoService.listarEquipamentos();
    return res.json(equipamentos);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
});

EquipamentoRouter.get('/:id', async (req, res) => {
  try {
    const equipamento = await equipamentoService.buscarEquipamentoPorId(req.params.id);

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado.' });
    }

    return res.json(equipamento);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
});

EquipamentoRouter.post('/', async (req, res) => {
  try {
    const equipamento = await equipamentoService.cadastrarEquipamento(req.body);
    return res.status(201).json(equipamento);
  } catch (erro) {
    return res.status(400).json({ erro: erro.message });
  }
});

EquipamentoRouter.patch('/:id/disponibilidade', async (req, res) => {
  try {
    const { disponivel } = req.body;

    if (typeof disponivel !== 'boolean') {
      return res.status(400).json({ erro: 'disponivel deve ser true ou false.' });
    }

    const equipamento = await equipamentoService.alterarDisponibilidade(req.params.id, disponivel);

    if (!equipamento) {
      return res.status(404).json({ erro: 'Equipamento não encontrado.' });
    }

    return res.json(equipamento);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
});

export default EquipamentoRouter;
