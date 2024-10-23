"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

import db from "../../db/db.js";

class Modele {
  add(table, value) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const sql = `INSERT INTO ${table} (${value
          .map((e) => e.keys)
          .join(",")}) 
            values (${value.map((e, i) => `$${i + 1}`).join(",")})`;
        yield db.query(
          sql,
          value.map((e) => e.value)
        );
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
  get(table, limit, sort) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const sql = `SELECT * FROM ${table} ${sort ? `ORDER BY ${sort}` : ""}
             ${limit && `LIMIT ${limit}`}`;
        const res = yield db.query(sql);
        return res.rows;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
  getOne(table, column, valueSearch) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const getItem = yield db.query(
          `SELECT * FROM ${table}
             WHERE ${column} = $1 `,
          [valueSearch]
        );
        return getItem.rows[0];
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
  search(table, prop, sort, limit) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const sql = `SELECT * FROM ${table} ${prop.map((e, i) =>
          i === 0
            ? `WHERE ${e.column} IN (${e.value.join(",")})`
            : `AND ${e.column} IN (${e.value.join(",")})`
        )} 
                ${sort ? `ORDER BY ${sort}` : ""} 
                ${limit ? `LIMIT ${limit}` : ""}`;
        const res = yield db.query(sql);
        return res.rows;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
  update(table, columnSerach, valueSearch, columnSET, valueSet, returning) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const sql = `UPDATE ${table} SET ${columnSET} = $1 
            WHERE ${columnSerach} = $2 ${returning ? "RETURNING *" : ""}`;
        const data = yield db.query(sql, [valueSet, valueSearch]);
        if (returning) return data.rows[0];
        else return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
  delete(table, valueSearch, columnSerach) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const sql = `DELETE FROM ${table} WHERE ${columnSerach} = $1`;
        yield db.query(sql, [valueSearch]);
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
  customSQL(SQL, val) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const res = yield db.query(SQL, val);
        return res.rows;
      } catch (e) {
        console.error(e);
        return false;
      }
    });
  }
}
export default new Modele();
