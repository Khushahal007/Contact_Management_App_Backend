const express=require("express");
const {registerUser, loginUser, currentUser} = require("../Controllers/userController");
const validation = require("../Middleware/validateToken");



const router=express.Router();



router.post("/register", registerUser)


router.post("/login", loginUser)


router.get("/current",validation, currentUser)

module.exports=router;