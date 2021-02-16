const palindrome=require("./palindrome")
const constructMethod=app=>{
    app.use("/",palindrome)
}
module.exports = constructMethod
