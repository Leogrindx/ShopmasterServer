import Router from "express";
import itemController from "./controllers/item.controller.js";
import CartController from "./controllers/cart.controller.js";
import UserController from "./controllers/user.controller.js";
import authMiddleware from "./middlewares/auth-middleware.js";
const router = new Router();
//-----------ITEM---------------
router.post("/item", itemController.create);
router.get("/item/:ean", itemController.getOne);
router.put("/item/", itemController.update);
router.delete("/item/:id", itemController.delete);

router.get("/items", itemController.get);
router.get("/search_items/:value", itemController.search);
router.get("/items/:gender", itemController.get);
router.get("/items/:gender/:type", itemController.get);
router.get("/items/:gender/:type/:under_type", itemController.get);

//-----------User---------------
router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);

//-----------Cart---------------
router.post("/cart/", CartController.add);
router.get("/cart/:userID", CartController.get);
router.put("/cart", CartController.update);
router.delete("/cart/:id", CartController.delete);

//-----------Universal---------------
// router.post('/universal', CartController.add)
// router.get('/universal/', CartController.get)
// router.get('/universal/:email', CartController.get)
// router.get('/universal/:email', CartController.get)
// router.put('/universal', CartController.update)
// router.delete('/universal', CartController.delete)

export default router;
