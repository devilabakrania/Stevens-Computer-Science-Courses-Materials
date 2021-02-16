const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const session = require("express-session")
const userdetail = require("./users")


router.get("/", async(req,res) => {
    if(req.session.user)
    res.redirect("/private")
    else
    res.render("login", {message:"You're not logged in"})
})
router.post("/login", async(req,res)=>{

    let userdata = await req.body
    let username = userdata["username"]
    let password = userdata["password"]
    let flag = 0
    let flag1 = false
    for (let i = 0; i<=userdetail.length-1;i++)
    {
       if(userdetail[i].username == username)
        {   
           flag1 = await bcrypt.compareSync(password, userdetail[i].hashedPassword)
            if(flag1 == true)
            {
                req.session.user = userdetail[i].username
                res.redirect("/private")
                break
            }
            else if(flag1 == false)
            res.status(401).render("login", {error: "Invalid Username or Password"})
        }
        else if(userdetail[i].username!==username)
        {
            flag=flag+1
            if(flag>userdetail.length-1)
            break
        }
        
    }
    if(flag >= userdetail.length)
        res.status(401).render("login",{error: "Invalid Username or Password"})
})
const loginauthCheck = (req, res, next) => {

    if(req.session.user)
        next()
      else 
        res.status(403).render("error")
}

router.get('/private',loginauthCheck, async (req, res) => {
    
    if(req.session.user != undefined)
    {
        for(let j = 0; j<=userdetail.length-1;j++)
        {
            if(req.session.user == userdetail[j].username)
            {
                res.render('user',{
                    _id:userdetail[j]._id,
                    username: userdetail[j].username,
                    firstName: userdetail[j].firstName,
                    lastName: userdetail[j].lastName,
                    profession: userdetail[j].profession,
                    bio: userdetail[j].bio
                })
                break
            }
        }
    }
    else
        res.status(403).render("error")
})
router.get('/logout', async (req, res) => {
    req.session.destroy()
    res.clearCookie('AuthCookie')
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.render("logout",{message:"You are logged out!"})
})
module.exports = router