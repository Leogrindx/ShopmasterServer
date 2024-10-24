import ItemModule from "../module/item.module.js";
import UniversalModele from "../module/ts/universal.module.js";
import ApiError from "../exceptions/api-error.js";
class ItemController {
  async create(req, res, next) {
    try {
      await ItemModule.create(req.body);
      res.json({ status: 200, type: "succesful", message: "item created" });
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const valuesSql = [];
      const keysParam = Object.keys(req.params);
      for (const e of keysParam) {
        valuesSql.push({ column: e, value: [req.params[e]] });
      }
      if (Object.keys(req.query).length > 0) {
        const keysQuery = Object.keys(req.query);
        for (const e of keysQuery) {
          if (e !== "price") {
            if (e !== "page") {
              valuesSql.push({
                column: e,
                value:
                  typeof req.query[e] === "string"
                    ? [req.query[e]]
                    : [...req.query[e]],
              });
            }
          }
        }
      }

      const sqlold = `SELECT * FROM ${`items`} ${valuesSql
        .map(
          (e, i) =>
            `${i === 0 ? "WHERE" : "AND"} ${e.column} IN (${e.value
              .map((e) => `'${e}'`)
              .join(",")})`
        )
        .join(" ")} ${
        req.query.price
          ? `${valuesSql.length === 0 ? "WHERE" : "AND"} price > ${
              req.query.price[0]
            } AND price < ${req.query.price[1]}`
          : ""
      }`;

      const items = await UniversalModele.customSQL(sqlold, []);
      console.log(sqlold);
      res.json(items);
    } catch (e) {
      next(e);
    }
  }

  async search(req, res, next) {
    try {
      const items = await UniversalModele.customSQL(
        `SELECT * FROM items WHERE LOWER(brand) LIKE '${
          req.params.value
        }%' OR LOWER(name) LIKE '${req.params.value.toLowerCase()}%'`,
        []
      );
      res.json(items);
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      const item = await ItemModule.getOne(req.params.ean);
      if (item.length === 0) {
        throw ApiError.BadRequest("such item not exists");
      }
      res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const item = await ItemModule.update(
        req.body.id,
        req.body.column,
        req.body.value
      );
      res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      await ItemModule.delete(req.params.id);
      res.json({ status: 200, type: "success", message: "item deleted" });
    } catch (e) {
      next(e);
    }
  }
}

export default new ItemController();
