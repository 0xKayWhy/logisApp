const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
const responseList = require ("../config/responselist.js");
require("dotenv").config();

//check user authority consistantly if they are using protected route
async function authenticateUser(req, res, next){
    const bearerToken = req.headers.authorization
    if(!bearerToken){
        return res.status(401).json({ message:  responseList.NOT_TOKEN})
    }
    const token = bearerToken.split(" ")[1] // Bearer <token> we split string by space in `Bearer 124` => ['Bearer', '124']
    if(!token){
        return res.status(401).json({ message:  responseList.NOT_TOKEN})
    }
    try{
        const decodedToken = jwt.verify(token,process.env.SECRET)
        if(!decodedToken){
            return res.status(401).json({ message: responseList.INVALID_TOKEN})
        }
        req.user = await User.findById(decodedToken.user_id)
        next() // move to next func
    }catch(e){
        if(e instanceof jwt.TokenExpiredError){ // check if error is instance of TokenExpiredError
            return res.status(401).json({ message: responseList.INVALID_TOKEN })
        }
        //show generic error
        return res.status(401).json({ message: responseList.SOMETHING_WRONG})
    }
}

module.exports = authenticateUser