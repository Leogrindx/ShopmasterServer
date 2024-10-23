import db from '../db/db.js'
class TokenModel {
    async create(prop){
        const {userid, refresh_token, time} = prop
        const token = await db.query('INSERT INTO tokens (userid, refresh_token, time)', [userid, refresh_token, time])
    }
    async get(id){
        const token = await db.query('SELECT * FROM tokens WHERE id = $1', [id])
        return token
    }
    async update(){
        const token = await db.query('UPDATE tokens tokens WHERE id = $1', [id])
        return token
    }
    async delete(){
        const token = await db.query('DELETE FROM tokens WHERE id = $1', [id])
        return token
    }
}

export default new TokenModel()