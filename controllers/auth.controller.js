const service = require('../service/auth.service')
const { generateRefreshToken, generateAccessToken } = require('../utils/token')

const register = async(req,res)=>{
    const user = await service.registerUser(req.body)
    res.json(user) 
}

const logIn = async(req,res)=>{
    try {
        const data = await service.logInUser(req.body)
        res.json(data)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const refresh = async(req,res)=>{
    try {
        const data = await service.refreshTokenService(
            req.body.refreshToken
        )
        res.json(data)        
    } catch (error) {
        res.status(401).json({error : error.message})
    }
}

const googleCallback = (req,res)=>{
    user = req.user

    const refreshToken = generateRefreshToken(user)
    const accessToken = generateAccessToken(user)

    res.redirect(
  `http://localhost:5173/auth-success?accessToken=${accessToken}&refreshToken=${refreshToken}`
)
}

module.exports = {register,logIn,refresh,googleCallback}