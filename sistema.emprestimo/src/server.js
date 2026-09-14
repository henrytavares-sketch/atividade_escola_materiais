import express from 'express';
import EquipamentoRouter from './routes/equipamento.routes.js';

const app = express();
app.use(express.json());
app.use('/equipamentos', EquipamentoRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta http://localhost:3000/equipamentos');
});