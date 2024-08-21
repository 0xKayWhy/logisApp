const router=require('express').Router();
const User=require("../model/userModel")
const bcrypt= require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()


const authenticateUser = require("../middlewares/authMiddleware")


const responseList=require('../config/responselist')

//response with user data 
router.get("/user",authenticateUser, async(req,res)=>{
  try{
        req.user.username=""
        req.user.password=""
        res.status(200).json(req.user);
  }catch(e){
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
})

//grant token to user after logged in
router.post('/login', async(req,res)=>{
    try{
        const user = await User.findOne({ username: req.body.username });
    
        if (!user) {
            return res.status(400).json({ message: responseList.USER_NOT_FOUND });
        }
        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordMatch) {
            return res.status(400)  
            .json({ message: responseList.USER_PASSWORD_ERROR });
        }
    
        const token = jwt.sign({user_id: user._id}, process.env.SECRET,{expiresIn : "1h"})
        res.status(200).json({ token, role : user.RegisterAs });
    }catch(e){
        console.log(e)
    }
})


//create new user
router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hashSync(req.body.password, 10); 
      const userDataToSave = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username, 
        password: hashedPassword,
        email: req.body.email,
        RegisterAs:req.body.RegisterAs,

      };
      const user = new User(userDataToSave);
      await user.save();
      const token = jwt.sign({user_id: user._id , role : user.RegisterAs}, process.env.SECRET, {expiresIn : "1h"})
      res.status(200).json({ message:responseList.CREATED_SUCCESS, token });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: responseList.BAD_REQUEST });
    }
  });
module.exports = router;