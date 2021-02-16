const dictionary = require("./dictionary");
//const dic = require('./dictionary')
try{
    console.log(dictionary.lookupDefinition("programming"))
console.log(dictionary.lookupDefinition("Programming"))
}
catch(error){
    console.log(error)
}
try{
    console.log(dictionary.getWord("abc"))
}
catch(error)
{
    console.log(error)
}
