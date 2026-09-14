import equipamentoService from './services/equipamento.service.js';

const lista = await equipamentoService.listarEquipamentos();
console.log('LISTA:', lista);

const novo = await equipamentoService.cadastrarEquipamento({
  nome: 'TesteFinalEntrada',
  categoria: 'Material',
  condicao: 'nova',
  disponivel: true,
});
console.log('NOVO:', novo);

const encontrado = await equipamentoService.buscarEquipamentoPorId(novo.id);
console.log('BUSCA:', encontrado);

const alterado = await equipamentoService.alterarDisponibilidade(novo.id, false);
console.log('ALTERADO:', alterado);

const inexistente = await equipamentoService.buscarEquipamentoPorId(999999);
console.log('INEXISTENTE:', inexistente);
