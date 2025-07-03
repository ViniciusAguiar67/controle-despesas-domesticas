import { pool } from '../database/db';
import { Expense } from '../models/Expense';

class ExpenseRepository {
  async getAllExpenses() {
    const [rows] = await pool.query(`
      SELECT 
        id,
        descricao AS description,
        valor AS value,
        data_compra AS date,
        id_categoria AS categoryId,
        id_local AS locationId,
        id_tipo_pagamento AS paymentTypeId
      FROM despesas
      WHERE YEAR(data_compra) = YEAR(CURRENT_DATE())
        AND MONTH(data_compra) = MONTH(CURRENT_DATE())
      ORDER BY data_compra DESC
    `);
    return rows as Expense[];
  };

  async getExpenseById(id: number) {
    const [rows] = await pool.query('SELECT * FROM despesas WHERE id = ?', [id]);
    const result = rows as any[];

    if (!result.length) return null;

    const row = result[0];

    return {
      id: row.id,
      description: row.descricao,
      value: Number(row.valor),
      date: row.data_compra,
      categoryId: row.id_categoria,
      locationId: row.id_local,
      paymentTypeId: row.id_tipo_pagamento,
    };
  };

  async createExpense(expense: Expense) {
    const { description, value, date, categoryId, locationId, paymentTypeId } = expense;
    const [result] = await pool.query(
      'INSERT INTO despesas (valor, data_compra, descricao, id_tipo_pagamento, id_categoria, id_local) VALUES (?, ?, ?, ?, ?, ?)',
      [value, date, description, paymentTypeId, categoryId, locationId]
    );
    return (result as any).insertId;
  };

  async updateExpense(id: number, expense: Expense) {
    const { description, value, date, categoryId, locationId, paymentTypeId } = expense;
    await pool.query(
      'UPDATE despesas SET valor = ?, data_compra = ?, descricao = ?, id_categoria = ?, id_local = ?, id_tipo_pagamento = ? WHERE id = ?',
      [value, date, description, categoryId, locationId, paymentTypeId, id]
    );
  };

  async deleteExpense(id: number) {
    await pool.query('DELETE FROM despesas WHERE id = ?', [id]);
  };
}

export { ExpenseRepository };