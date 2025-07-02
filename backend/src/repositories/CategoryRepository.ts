import { pool } from '../database/db';
import { Category } from '../models/Category';

class CategoryRepository {
  async getAllCategories() {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        nome AS name, 
        descricao AS description 
      FROM categorias
      ORDER BY nome ASC
    `);

    return rows as Category[];
  };
  async getCategoryById (id: number) {
    const [rows] = await pool.query(`
      SELECT 
        id, 
        nome AS name, 
        descricao AS description 
      FROM categorias
      WHERE id = ?
    `, [id]);

    return (rows as Category[])[0] || null;
  };
}

export { CategoryRepository };