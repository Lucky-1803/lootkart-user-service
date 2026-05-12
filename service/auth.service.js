const  jwt  = require ("jsonwebtoken")
const bcrypt = require ('bcryptjs')
const User = require ('../models/user.model')
const { generateAccessToken, generateRefreshToken } = require ("../utils/token")


const registerUser = async({name,email,password})=>{
    try {
    
        const existingUser = await User.findOne({email})
        
        if(existingUser){
            throw new Error("User already exists")
        }
    
        const hashPassword = await bcrypt.hash(password,10)
    
        const user = await User.create({name,email,password:hashPassword})
    
        return user
            
    } catch (error) {
        throw error
    }
}
 const logInUser = async({email,password})=>{
    try {
    
        const user = await User.findOne({email})
        
        if(!user){
            throw new Error("User not found")
        }
    
        const isMatch = await bcrypt.compare(password , user.password)
    
        if(!isMatch){
            
            throw new Error("Invalid password")
        }

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        user.refreshToken = refreshToken
        await user.save()

        return {accessToken , refreshToken}
       
        
    } catch (error) {
        throw error
    }
}

const refreshTokenService = async (token)=>{

    const decoded = jwt.verify(token,process.env.REFRESH_SECRET)

    const user = await User.findById(decoded.userId)

    if(!user || user.refreshToken !== token){
        throw new Error("Invalid Token")
    }

    const newAccessToken = generateAccessToken(user)

    return {accessToken : newAccessToken}
}




module.exports = {registerUser,logInUser,refreshTokenService}