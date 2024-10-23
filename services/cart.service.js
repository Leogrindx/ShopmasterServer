import Modele from "../module/ts/universal.module.js";
import { midlewareForCart } from "../middlewares/auth-middleware.js";
import { saparaterToArray } from "../tolls/separator.js";

class CartService {
  makeNewArray(carts, items) {
    const state = [];
    for (let i = 0; i < carts.length; i++) {
      state.push({
        cart: carts[i],
        item: items.find((e) => e.id === carts[i].itemid),
      });
    }
    return state;
  }

  async add(req) {
    console.log(req.body);
    if (req.body.length > 1) {
      const migrate = JSON.parse(req.body[1]);
      for (let i = 0; i < migrate.length; i++) {
        console.log(migrate[i]);
        await Modele.add(
          "cart",
          saparaterToArray({ ...migrate[i], userid: req.body[0] })
        );
      }
    } else {
      const result = await Modele.add("cart", saparaterToArray(req.body[0]));
      if (result) {
        return { status: 200, type: "succesful", message: "item add" };
      } else {
        return { sratus: 404, type: "error" };
      }
    }
  }

  async get(params, authorizationHeader) {
    let carts;
    if (midlewareForCart(authorizationHeader)) {
      carts = await Modele.search(
        "cart",
        [{ column: "userid", value: [params] }],
        false
      );
    } else {
      if (!params) {
        carts = [];
        return;
      }
      if (params === "undefiend") {
        carts = [];
        return;
      }
      if (params === "null") {
        carts = [];
        return;
      }
      const json = JSON.parse(params);
      carts = json;
    }
    if (carts.length === 0) return [];
    const filter = carts.map((e) => e.itemid);
    const items = await Modele.search(
      "items",
      [{ column: "id", value: filter }],
      false
    );
    return this.makeNewArray(carts, items);
  }
}

export default new CartService();
