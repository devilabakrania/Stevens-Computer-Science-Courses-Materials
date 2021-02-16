const session = require("express-session")
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser") 
const bodyParser = require("body-parser")
const configRoutes = require("./routes")
app.use(cookieParser())
app.use(express.json())
const exphbs = require("express-handlebars")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine("handlebars", exphbs({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(session({
    name: "AuthCookie",
    secret: "secret string!",
    resave: false,
    saveUninitialized: true
}))

app.use(async(req, res, next)=>{
    let auth
    //${req.session.user ? "" : "Non-"}Authenticated User
    if(req.session.user !== "")
    auth = "Authenticated User"
    else
    {auth = "Non-Authenticated User"}
    console.log(new Date().toUTCString(), req.method, req.originalUrl, auth)
    next()
})

configRoutes(app)
app.listen(3000,() => {
    console.log("Your routes will be running on new server http://localhost:3000")
})