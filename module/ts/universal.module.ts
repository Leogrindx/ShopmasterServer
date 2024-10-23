import db from "../../db/db.js";
class Modele {
  async add(table: string, value: [{ keys: string; value: any }]) {
    try {
      const sql = `INSERT INTO ${table} (${value.map((e) => e.keys).join(",")}) 
            values (${value.map((e, i) => `$${i + 1}`).join(",")})`;
      await db.query(
        sql,
        value.map((e) => e.value)
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async get(table: string, limit: number, sort?: string) {
    try {
      const sql = `SELECT * FROM ${table} ${sort ? `ORDER BY ${sort}` : ""}
             ${limit && `LIMIT ${limit}`}`;
      const res = await db.query(sql);
      return res.rows;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getOne(table: string, column: string, valueSearch: string) {
    try {
      const getItem = await db.query(
        `SELECT * FROM ${table}
             WHERE ${column} = $1 `,
        [valueSearch]
      );
      return getItem.rows[0];
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async search(
    table: string,
    prop: [{ column: string; value: string[] }],
    limit?: number,
    sort?: boolean
  ) {
    try {
      const sql = `SELECT * FROM ${table} ${prop.map((e, i) =>
        i === 0
          ? `WHERE ${e.column} IN ('${e.value.join(",")}')`
          : `AND ${e.column} IN ('${e.value.join(",")}')`
      )} ${sort ? `ORDER BY ${sort}` : ""} ${limit ? `LIMIT ${limit}` : ""};`;
      console.log(sql);
      const res = await db.query(sql);
      return res.rows;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async update(
    table: string,
    columnSerach: string,
    valueSearch: string,
    columnSET: string,
    valueSet: string,
    returning: boolean
  ) {
    try {
      const sql = `UPDATE ${table} SET ${columnSET} = $1 
            WHERE ${columnSerach} = $2 ${returning ? "RETURNING *" : ""}`;
      const data = await db.query(sql, [valueSet, valueSearch]);
      console.log("%cUpdate Succesful!", "color: green;");
      if (returning) return data.rows[0];
      else return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async delete(table: string, valueSearch: string, columnSerach: string) {
    try {
      const sql = `DELETE FROM ${table} WHERE ${columnSerach} = $1`;
      await db.query(sql, [valueSearch]);
      console.log("%cDelete Succesful!", "color: green;");
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async customSQL(SQL: string, val: string[]) {
    try {
      const res = await db.query(SQL, val);
      return res.rows;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default new Modele();
