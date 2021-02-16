const express=require("express")
const router=express.Router()
//var path=require('path')

router.get("/",async (req,res)=>{
   try{
        res.render('posts/index');
   }
   catch(e){
       console.log("Exception",e)
       res.json({error:e})
   }
})
module.exports=router;