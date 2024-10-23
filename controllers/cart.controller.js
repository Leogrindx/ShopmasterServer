import Modele from "../module/ts/universal.module.js";
import { saparaterToArray } from "../tolls/separator.js";
import CartService from "../services/cart.service.js";

class CartController {
  async add(req, res, next) {
    try {
      const response = await CartService.add(req);
      console.log(response);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      const response = await CartService.get(
        req.params.userID,
        req.headers.authorization
      );
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const result = await Modele.update(
        "cart",
        "id",
        req.body.id,
        "number",
        req.body.number,
        false
      );
      if (result) {
        res.json({ status: 200, type: "succesful", message: "item updated" });
      } else {
        res.json({ sratus: 404, type: "error" });
      }
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await Modele.delete("cart", req.params.id, "id");
      if (result) {
        res.json({ status: 200, type: "succesful", message: "item delete" });
      } else {
        res.json({ sratus: 404, type: "error" });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new CartController();
