import Router from 'express'
import itemController from './controllers/item.controller.js'
import UserController from './controllers/user.controller.js'
import authMiddleware from './middlewares/auth-middleware.js'
const router = new Router()
//-----------ITEM---------------
router.post('/item', itemController.create)
router.get('/item/:id', itemController.getOne)
router.put('/item/', itemController.update)
router.delete('/item/:id', itemController.delete)

router.get('/items', itemController.get)
router.get('/items/:gender', itemController.get)
router.get('/items/:gender/:type', itemController.get)
router.get('/items/:gender/:type/:under_type', itemController.get)

//-----------User---------------
router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)

export default router
