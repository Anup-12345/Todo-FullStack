const express=require("express");
const { registerController, logincontroler } = require("../controllers/userController");

const router=express.Router()
router.post('/register',registerController)
router.post('/login',logincontroler)
module.exports=router;