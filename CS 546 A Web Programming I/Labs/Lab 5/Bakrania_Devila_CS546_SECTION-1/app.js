const express = require("express")
const app = express()
const configRoutes = require("./routes")

configRoutes(app)

app.listen(3000, () => {
    console.log("We've got a server now!")
    console.log("Routes will run on http://localhost:3000")
})