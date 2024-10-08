const express= require('express')
const app=express()
const cors = require('cors');
const path = require("path")

const mongoose=require('mongoose')
require('dotenv').config()


const parcelController=require('./controllers/parcelController')
const authController=require('./controllers/authcontroller')
const adminContoller=require('./controllers/adminController')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo connected"));


app.use(cors());
app.use(express.static(path.join(__dirname,"build")))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", parcelController)
app.use("/user",authController)
app.use("/admin",adminContoller)
app.use("/deliveryguy", parcelController)


const PORT=process.env.PORT

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname,"build", "index.html"))
})




app.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`)
})

module.exports = app;

