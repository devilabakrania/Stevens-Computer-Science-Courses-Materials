const express = require("express")
const router = express.Router()

router.get("/", async(req,res) => {
    try{
        const education = [
        {
            "schoolName": "St Mary's School",
            "degree": "SSC",
            "favoriteClass": "Mathematics",
            "favouriteMemory": "Winning first prize in all four participated events"
        },
        {
            "schoolName": "Modi School",
            "degree": "HSC",
            "favoriteClass": "Science",
            "favouriteMemory": "First Rank at State Level"
        },
        {
            "schoolName": "VVP Engineering College",
            "degree": "BECE",
            "favoriteClass": "Operating System",
            "favouriteMemory": "Becoming Microsoft Student Partner"
        },
        {
            "schoolName": "Stevens Institute of Technology",
            "degree": "MSCS",
            "favoriteClass": "Web Programming",
            "favouriteMemory": "Free Food and Assignments"
        }
        ]
    res.json(education)
}
    catch(error){
        res.status(500).send()
    }
})

module.exports = router