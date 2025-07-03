import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import expenseRoutes from '../routes/expense.routes';
import categoryRoutes from '../routes/category.routes';
import paymentTypeRoutes from '../routes/paymentType.routes';

dotenv.config();

const app = express();

app.use(cors()); 

app.use(express.json());

app.use('/api/despesas', expenseRoutes);
app.use('/api/categorias', categoryRoutes);
app.use('/api/tipos-de-pagamento', paymentTypeRoutes);

app.get('/', (req, res) => {
  res.send('API Orçamento Doméstico funcionando!');
});

export default app;
