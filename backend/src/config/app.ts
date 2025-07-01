import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import expenseRoutes from '../routes/expense.routes';

dotenv.config();

const app = express();

app.use(cors()); 

app.use('/api/despesas', expenseRoutes);

app.get('/', (req, res) => {
  res.send('API Orçamento Doméstico funcionando!');
});

export default app;
