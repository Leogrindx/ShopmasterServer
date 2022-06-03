import db from '../db/db.js'

class Item {
    async create(prop){
        const {ean, brand, name, info, type, under_type, size, material, price, gender, color, img} = prop
        const createItem = await db.query(
        "INSERT INTO items (EAN, brand, name, info, type, under_type, size, material, price, gender, color, img) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        [ean, brand, name, info, type, under_type, size, material, price, gender, color, img])
        return createItem.rows[0]
    }

    async get(params){
        if(params.hasOwnProperty('under_type')){
            const getItem = await db.query('SELECT * FROM items WHERE gender = $1 AND type = $2 AND under_type = $3', 
            [params.gender, params.type, params.under_type])
            return getItem.rows
        }
        if(params.hasOwnProperty('type')){
            const getItem = await db.query('SELECT * FROM items WHERE gender = $1 AND type = $2', 
            [params.gender, params.type])
            return getItem.rows
        }
        if(params.hasOwnProperty('gender')){
            const getItem = await db.query('SELECT * FROM items WHERE gender = $1', [params.gender])
            return getItem.rows
        }
        const getItem = await db.query('SELECT * FROM items')
        return getItem.rows
    }

    async getOne(id){
        const getItem = await db.query('SELECT * FROM items WHERE id = $1', [id])
        return getItem.rows
    }

    async update(column, value, id){
        const sql = `UPDATE items SET ${column} = $1 WHERE id = $2 RETURNING *`
        const updateItem = await db.query(sql, [value, id])
        return updateItem.rows[0]
    }

    async delete(id){
        const deleteItem = await db.query('DELETE FROM items WHERE id = $1', [id])
        return deleteItem.rows
    }
}

export default new Item()