import db from "../db/db.js";

class Item {
  async create(prop) {
    const {
      ean,
      brand,
      name,
      type,
      under_type,
      size,
      material,
      price,
      cent,
      gender,
      color,
      fasion,
      cutting,
      img,
    } = prop;
    const createItem = await db.query(
      "INSERT INTO items (EAN, brand, name, type, under_type, size, material, price, cent, gender, color, fasion, cutting, img) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
      [
        ean,
        brand.toLowerCase(),
        name.toLowerCase(),
        type.toLowerCase(),
        under_type.toLowerCase(),
        size,
        material.toLowerCase(),
        price,
        cent,
        gender.toLowerCase(),
        color.toLowerCase(),
        fasion.toLowerCase(),
        cutting.toLowerCase(),
        img,
      ]
    );
    return createItem.rows[0];
  }

  async get(result, query) {
    class Params {
      results = result;
      query = query;
      querySQL(SQL) {
        if (Object.keys(this.query).length > 0) {
          return `${SQL} LIMIT ${this.query.page}00`;
        } else {
          return SQL;
        }
      }
      async send(sqlWHERE, values) {
        if (this.results) {
          const getItem = await db.query(
            `SELECT * FROM items ${sqlWHERE}`,
            values
          );
          return getItem.rows;
        } else {
          return { sqlWHERE: sqlWHERE, values: values };
        }
      }
      async under_type(gender, type, under_type) {
        const result = await this.send(
          "WHERE gender = $1 AND type = $2 AND under_type = $3",
          [gender, type, under_type]
        );
        return result;
      }
      async type(gender, type) {
        const result = await this.send("WHERE gender = $1 AND type = $2", [
          gender,
          type,
        ]);
        return result;
      }
      async gender(gender) {
        const result = await this.send("WHERE gender = $1", [gender]);
        return result;
      }
      async default() {
        const getItem = await db.query("SELECT * FROM items");
        return getItem.rows;
      }
    }
    return new Params();
  }

  async filter(columns, values) {
    const joinColumns = columns.length > 0 && columns.join(" AND ");
    const SQL = `SELECT * FROM items ${joinColumns}`;
    const getItem = await db.query(SQL, values);
    return getItem.rows;
  }

  async search(val) {
    const getItem = await db.query(
      "SELECT * FROM items WHERE name = $1 OR brand = $1",
      [val]
    );
    return getItem.rows;
  }

  async getOne(ean) {
    const getItem = await db.query("SELECT * FROM items WHERE ean = $1", [ean]);
    return getItem.rows;
  }

  async update(id, column, value) {
    const sql = `UPDATE items SET ${column} = $1 WHERE id = $2 RETURNING *`;
    const updateItem = await db.query(sql, [value, id]);
    return updateItem.rows[0];
  }

  async delete(id) {
    const deleteItem = await db.query("DELETE FROM items WHERE id = $1", [id]);
    return deleteItem.rows;
  }
}

export default new Item();
