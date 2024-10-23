import ItemModule from "../module/item.module.js";
import ApiError from "../exceptions/api-error.js";
class ItemService {
  async create() {}

  async get(params, state = true, page) {
    const param = params.path.split("-");
    const Item = await ItemModule.get(state);
    if (param.length === 3) {
      const result = await Item.under_type(param[0], param[1], param[2]);
      return result;
    }
    if (param.length === 2) {
      const result = await Item.type(param[0], param[1]);
      return result;
    }
    if (param.length === 1) {
      const result = await Item.gender(param[0]);
      return result;
    }
    if (state) {
      const result = Item.default();
      return result;
    }
  }

  async filter(params) {
    const { path, filter } = params;
    if (!path) {
      throw ApiError.BadRequest("item Not Found");
    }
    const slqPath = await this.get(params, false);
    const parse = filter.split("-");
    let count = slqPath.values.length;
    const values = slqPath.values;
    const columns = [
      slqPath.sqlWHERE,
      ...parse.map((e, i) => {
        const parse = e.split("=");
        const parseValue = parse[1].split(",").map((e, i) => {
          if (parse[0] === "price") {
            if (i === 0) {
              values.push(e);
              count = count + 1;
              return `${parse[0]} >= $${count}`;
            } else {
              values.push(e);
              count = count + 1;
              return `${parse[0]} <= $${count}`;
            }
          } else {
            values.push(e.toLowerCase());
            count = count + 1;
            return `$${count}`;
          }
        });
        if (parse[0] === "price") {
          return parseValue.join(" AND ");
        } else {
          return `${parse[0]} IN (${parseValue})`;
        }
      }),
    ];
    const Item = await ItemModule.filter(columns, values);
    return Item;
  }

  async update(body) {}

  async delete() {}
}

export default new ItemService();
