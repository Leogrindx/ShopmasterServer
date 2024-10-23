import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken){
        try{
            const newToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
            return newToken
        }catch(e){
            return null
        }
    }

    validateRefreshToken(refreshToken){
        try{
            const newToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            return newToken
        }catch(e){
            return null
        }
    }

    
}

export default new TokenService()