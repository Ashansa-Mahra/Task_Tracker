const { Client } = require('pg');

class ItemModel {
  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'Admin@123',
      port: 5432,
    });
    this.client.connect();
  }

  async createItem(name, status, description) {
    const query = 'INSERT INTO Tasks (name, status, description) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, status,description];
    try {
      const result = await this.client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async getAllItems() {
    const query = 'SELECT * FROM Tasks';
    try {
      const result = await this.client.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  async getAllTaskMatricItems(status, startDate, endDate) {
    let query = `
      SELECT
        status,
        COUNT(*) AS task_count
      FROM Tasks
    `;

    const queryParams = [];

    if (status) {
      queryParams.push(status);
      query += ' WHERE status = $1';
    }

    if (startDate && endDate) {
      queryParams.push(startDate, endDate);
      if (queryParams.length === 2) {
        query += ' WHERE ';
      } else {
        query += ' AND ';
      }
      query += 'createdat >= $2 AND createdat <= $3';
    }

    query += ' GROUP BY status';

    try {
      const result = await this.client.query(query, queryParams);
      const metrics = {};

      result.rows.forEach((row) => {
        metrics[row.status] = row.task_count;
      });

      return metrics;
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id, status, name) {
    const query = 'UPDATE Tasks SET status = $1 WHERE id = $2 and name = $3 RETURNING *';
    const values = [status, id, name];
    try {
      const result = await this.client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id) {
    const query = 'DELETE FROM Tasks WHERE id = $1';
    const values = [id];
    try {
      await this.client.query(query, values);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ItemModel;
