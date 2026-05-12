const express = require ( "express")
const { googleCallback, logIn, refresh, register } = require ( "../controllers/auth.controller")
const passport = require ( "passport")

const router = express.Router()

router.post("/register", register)
router.post("/logIn", logIn)
router.post("/refresh", refresh)

router.get("/google",passport.authenticate("google",{scope:["profile","email"]}))
router.get("/google/callback", passport.authenticate("google",{session:false}),googleCallback)

module.exports= router