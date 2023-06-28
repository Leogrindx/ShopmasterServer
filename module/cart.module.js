import db from '../db/db.js'

class Cart{
    async add(params){
        const res = await db.query('INSERT INTO cart (useremail, itemid) values ($1, $2)', 
        [params.useremail.toLowerCase(), params.itemid])
        return res.rows[0]  
    }

    async get(email){
        const cart = await db.query('SELECT * FROM cart WHERE useremail = $1', [email])
        const itemsSQL = cart.rows.map(e => e.itemid)
        const items = await db.query(`SELECT * FROM items WHERE id IN (${itemsSQL.join()})`)
        return items.rows
    }

    async update(){
        const res = await db.query('UPDATE', [])   
    }

    async delete(){
        const res = await db.query('SQL', [])   

    }
}

export default new Cart()