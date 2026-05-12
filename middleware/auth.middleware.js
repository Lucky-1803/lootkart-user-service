const  {jwt} = require ("jsonwebtoken")

const authMiddleware = async (req , res , next )=>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        res.status(401).json({message:"No token"})
    }

    try {
        const token = authHeader.startsWith("Bearer ")? authHeader.split(" ")[1]:authHeader
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message:"Invalid token"})        
    }
}

module.exports = authMiddleware