const express = require('express')
const path = require('path')
const app=express()
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
//const palindrome = require('./public/palindrome')
const configRoutes=require("./routes")
const static=express.static(__dirname+"/public")

app.use(express.static(path.join(__dirname, '/public')));
app.use("/public",static)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//app.get('/', (req, res) => {
   //res.sendFile(path.join(__dirname, 'public', 'palindrome'))
//});
//app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

configRoutes(app)

app.listen(3000,()=>{
    console.log("Server is now ON and it is running on http://localhost:3000");
})
