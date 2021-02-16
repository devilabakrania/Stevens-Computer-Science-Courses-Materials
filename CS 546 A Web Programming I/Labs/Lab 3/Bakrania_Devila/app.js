let fileData = require('./fileData');
let textMetrics = require('./textMetrics');
let bluebird = require('bluebird');
let fs = bluebird.promisifyAll(require('fs'));
chapter();
async function chapter(){

    try{
        //fs.existsSync('chapter1.result.json')
        console.log('Printing Chapter1 result')
        //fileData.getFileAsJSON('Chapter1.result.json')
        await main("./chapter1.txt");
        console.log("Chapter1 data printed");
    }
    catch(error){
        console.log(error);
    }
    try{
        console.log('Printing Chapter2 result')
        await main("./chapter2.txt");
        console.log("Chapter2 data printed")
    }
    catch(error){
        console.log(error)
    }
    try{
        console.log('Printing Chapter3 result')
        await main("./chapter3.txt");
        console.log("Chapter3 data printed")
    }
    catch(error){
        console.log(error);
    }
}

async function main(path){
    if(!path)
    throw "Invalid path!"
    if(!(await fs.existsSync(path)))
    throw "Invalid path"


    if(!(await fs.existsSync(path.substring(0,path.lastIndexOf('.'))+".result.json")))
       {
       let c = await fileData.getFileAsString(path)
       let b = textMetrics.simplify(c)
       let d = path.substring(0,path.lastIndexOf("."))
       let f = textMetrics.createMetrics(b)
       await fileData.saveStringToFile(d+".file.txt",b)
       await fileData.saveJSONToFile(d+".result.json",f)
       console.log(f)
    }
       else{
           let f = await fileData.getFileAsJSON(path.substring(0,path.lastIndexOf('.'))+".result.json");
           console.log(f)
       }
}