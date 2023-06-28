import ItemModule from "../module/item.module.js";
import UniversalModule from "../module/ts/universal.module.js";
import ItemService from "../services/item.service.js";
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
      const item = await ItemService.get(req.params, req.query);
      if (item.length === 0) {
        throw ApiError.BadRequest("item Not Found");
      }
      res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async filter(req, res, next) {
    try {
      const item = await ItemService.filter(req.params, req.query);
      if (item.length === 0) {
        throw ApiError.BadRequest("item Not Found");
      }

      res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async search(req, res, next) {
    try {
      const items = await UniversalModule.customSQL(
        `SELECT * FROM items WHERE LOWER(brand) LIKE '${
          req.params.value
        }%' OR LOWER(name) LIKE '${req.params.value.toLowerCase()}%'`,
        []
      );
      console.log(items);
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
