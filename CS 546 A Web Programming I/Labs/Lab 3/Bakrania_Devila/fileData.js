let bluebird = require("bluebird")
let fs = bluebird.promisifyAll(require("fs"))
module.exports = {
async getFileAsString(path){
    if(!path)
    throw "You have not provided file path"
    let data = await fs.readFileAsync(path,'utf-8')
    return data
},
async getFileAsJSON(path){
    if(!path)
    throw "You have not provided file path"
    let data = await fs.readFileAsync(path, 'utf-8')
    try{
        let JSONfile = JSON.parse(data)
        return data;
    }
    catch(error){
        console.log(error)
        throw "Invalid JSON!"
    }
},
async saveStringToFile(path,text){
    if(!path)
    throw "You have not provided file path"
    if(typeof(text)!=="string")
    throw "Invalid text!"
    let savestr = await fs.writeFileAsync(path,text)
    return savestr
},
async  saveJSONToFile(path,obj){
   if(!path)
   throw "You have not provided file path"
   if(typeof(obj)!=="object")
   throw "Invalid Object!"
   try{
       let jsonstr = JSON.stringify(obj)
       let savestr = await fs.writeFileAsync(path,jsonstr)
       return savestr
   }
   catch(error){
       console.log(error)
       throw "Invalid Object! Unable to write"
   }
}
//module.exports = {
   // getFileAsString,
    //getFileAsJSON,
    //saveStringToFile,
    //saveJSONToFile
//
}