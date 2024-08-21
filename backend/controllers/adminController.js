
const router = require('express').Router();
const seedModel = require('../model/seedModel');
const authenticateUser = require("../middlewares/authMiddleware")

//get all data from server
router.get("/data", async (req,res) => {
    try{
      const database = await seedModel.find()
      const sortedDatabase = database.sort((a,b)=> a.trackingNo - b.trackingNo)
      res.json({sortedDatabase})
    }catch(e){
      console.log(e)
    }
    
    
})

//admin create new parcel based on input from user
router.post("/create",authenticateUser,async (req,res) => {
    try{
        const dataSize = await seedModel.find()
        const lastCount = dataSize[dataSize.length-1].trackingNo
        const create = new seedModel({
            ...req.body,
            currentLocation : req.body.origin,
            status : "created",
            trackingNo : lastCount+1
        })
        await create.save()
        res.sendStatus(200)

    }catch(e){
        console.log(e)
    }
})

//admin edit parcel based on input from user
router.put("/edit/:id",authenticateUser, async (req,res) => {
    try {
        const update = await seedModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
            $push : {editedBy : req.body.tranckingNo}
        })
        res.sendStatus(200);

    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }

})

//admin delete seleceted parcel
router.delete("/delete/:id", async (req,res) => {
    try {
        const update = await seedModel.findByIdAndDelete(req.params.id)
        res.sendStatus(200)
    
    }catch(e){
        console.log(e)
        res.sendStatus(500);
    }

})

module.exports = router