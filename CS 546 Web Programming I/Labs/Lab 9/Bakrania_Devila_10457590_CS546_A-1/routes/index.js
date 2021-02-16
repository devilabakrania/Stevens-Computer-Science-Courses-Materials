const express = require("express")
const router = express.Router()
const path = require("path")
router.get("/", (req,res) => {
    try{
        res.sendFile(path.resolve("public/index.html"))
    }
    catch(e){
        res.sendStatus(500)
    }
})
const constructMethod = app => {
    app.use("/", router);
    app.use("*", (req,res) => {
        res.sendStatus(404)
    })
}
module.exports = constructMethod;
