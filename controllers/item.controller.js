import ItemModule from '../module/item.module.js'
import ApiError from '../exceptions/api-error.js'
class ItemController {
    async create(req, res, next){
        try{
            const createItem = await ItemModule.create(req.body)
            res.json({status: 200, type: 'succesful', message: 'item created'})
        }catch(e){
            next(e)
        }
    }

    async get(req, res, next){
        try{
            const item = await ItemModule.get(req.params)
            if(item.length === 0){
                throw ApiError.BadRequest('item Not Found')
            }
            res.json(item)
        }catch(e){
            next(e)
        }
    }

    async getOne(req, res, next){
        try{
            const item = await ItemModule.getOne(req.params.id)
            if(item.length === 0){
                throw ApiError.BadRequest('such item not exists')
            }
            res.json(item)
        }catch(e){
            next(e)
        }
    }

    async filter(req, res, next){
        try{

        }catch(e){
            next(e)
        }
    }

    async update(req, res, next){
        try{
            const item = await ItemModule.update('name', req.body.name, req.body.id)
            res.json(item)
        }catch(e){
            next(e)
        }
        
    }

    async delete(req, res, next){
        try{
            const item = await ItemModule.delete(req.params.id)
            res.json({status: 200, type: 'success', message: 'item deleted'})
        }catch(e){
            next(e)
        }
    }
}

export default new ItemController()