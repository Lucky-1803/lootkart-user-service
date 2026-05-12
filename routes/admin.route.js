const express = require('express')

const router = express.Router()

const  authorize = require('../middleware/admin.middleware')
const authMiddleware  = require('../middleware/auth.middleware')

router.get("/dashboard",authMiddleware,authorize("ADMIN"),(req,res)=>{res.json({message:"Welcome to Admin Panel"})})

module.exports = router