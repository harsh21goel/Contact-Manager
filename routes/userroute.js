const express = require('express')
const { registeruser, loginuser, currentuser } = require('../controller/usercontroller')
const validateToken = require('../middleware/validaToken')


const router = express.Router()

router.post("/register",registeruser)
router.post("/login",loginuser)
router.get("/current",validateToken,currentuser)


module.exports=router