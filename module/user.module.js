import db from '../db/db.js';
import ApiError from '../exceptions/api-error.js'
class UserController {
    async create(prop){
        const {first_name, last_name, gender, email, password, position, activationLink} = prop
        const createItem = await db.query(
        "INSERT INTO users (first_name, last_name, gender, email, password, position, activationLink) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [first_name, last_name, gender, email, password, position, activationLink])
        return createItem.rows[0]
    }
    
    async get(){
        const getItem = await db.query('SELECT * FROM users')
        return getItem.rows
    }

    async getOne(column, value){
        const sql = `SELECT * FROM users WHERE ${column} = $1`
        const getItem = await db.query(sql, [value])
        return getItem.rows
    }

    async update(column, value, id){
        const sql = `UPDATE users SET ${column} = $1 WHERE id = $2 RETURNING *`
        const updateItem = await db.query(sql, [value, id])
        return updateItem.rows[0]
    }

    async delete(id){
        const deleteItem = await db.query('DELETE FROM users WHERE id = $1', [id])
        return deleteItem.rows
    }
}

export default new UserController()