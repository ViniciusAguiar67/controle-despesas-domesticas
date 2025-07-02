import { pool } from '../database/db';
import { PaymentType } from '../models/PaymentType';

class PaymentTypeRepository {
  async getAllPaymentTypes() {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        tipo AS type 
      FROM tipos_pagamento
      ORDER BY tipo ASC
    `);

    return rows as PaymentType[];
  };

  async getPaymentTypeById(id: number) {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        tipo AS type 
      FROM tipos_pagamento
      WHERE id = ?
    `, [id]);

    return (rows as PaymentType[])[0] || null;
  };
}

export { PaymentTypeRepository };