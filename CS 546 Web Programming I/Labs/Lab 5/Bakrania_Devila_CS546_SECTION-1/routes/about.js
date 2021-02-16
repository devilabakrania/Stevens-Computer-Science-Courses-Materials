const express = require("express")
const router = express.Router()

router.get("/", async(req,res) => {
    try{
        const about = 

{
    "name": "Devila Bakrania",
    "cwid": "10457590",
    "biography": "Devila Bakrania is studying Computer Science from Stevens Institute of Technology. She also has Web Programming subject in which Patrick Hill is the Professor and Rachel,Gabby are her Teaching Assistance. \n She loves coding and she is looking forward to learn more from Stevens University",
    "favoriteShows": ["VirDas", "The Kapil Sharma Show", "Beyhad2", "Friends"],
    "hobbies": ["Coding", "Writing", "Dancing"]
}

res.json(about)
}
    catch(error){
        res.status(500).send()
    }
})

module.exports = router