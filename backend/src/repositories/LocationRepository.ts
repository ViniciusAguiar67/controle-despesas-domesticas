import { pool } from '../database/db';
import { Location } from '../models/Location';

class LocationRepository {
  async getLocationById(id: number) {
    const [rows] = await pool.query('SELECT * FROM enderecos WHERE id = ?', [id]);
    const row = (rows as any[])[0];
    if (!row) return null;

    return {
      id: row.id,
      address: row.logradouro,
      number: row.numero,
      neighborhood: row.bairro,
      city: row.municipio,
      state: row.uf,
      complement: row.complemento,
      zipCode: row.cep,
    };
  };

  async createLocation(location: Location) {
    const { state, city, neighborhood, address, number, complement, zipCode } = location;
    const [result] = await pool.query(
      `INSERT INTO enderecos 
      (logradouro, numero, bairro, municipio, uf, complemento, cep) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [address, number, neighborhood, city, state, complement, zipCode ]
    );
    return (result as any).insertId;
  };

  async updateLocation(id: number, location: Location) {
    const { state, city, neighborhood, address, number, complement, zipCode } = location;
    await pool.query(
      `UPDATE enderecos SET 
      logradouro = ?, numero = ?, bairro = ?, municipio = ?, uf = ?, complemento = ?, cep = ?
      WHERE id = ?`,
      [address, number, neighborhood, city, state, complement, zipCode, id]
    );
  };

  async deleteLocation(id: number) {
    await pool.query('DELETE FROM enderecos WHERE id = ?', [id]);
  };
}

export { LocationRepository };