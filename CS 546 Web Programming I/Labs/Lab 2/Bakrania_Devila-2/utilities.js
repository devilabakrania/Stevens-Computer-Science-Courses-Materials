
function deepEquality(obj1,obj2){
    
    if(typeof(obj1)==="undefined")
    throw "You need to provide an argument value";
    else if(typeof(obj1)!=="object")
    throw "Argument is not an object"
    else if(typeof(obj2)==="undefined")
    throw "You need to provide an argument value"
    else if(typeof(obj2)!=="object")
    throw "Argument is not an object"
    
 
    let i =0
    while(i <= array1.length-1)
    {
        let ArrayQ = array1[i]
        if(obj1[ArrayQ] == obj2[ArrayQ])
        return true
        else
        return false
    }
    if(array1.length == array2.length){
    return true
}
    return false
}
function uniqueElements(arr){
    if(typeof(arr) === "undefined")
    throw "You need to provide an argument value"
    if(typeof(arr) !== "object")
    //if(Array.isArray(arr)==false)
    throw "You have not provided an array as an argument"

    let c = []
    let a = 0
    let j= 0
    let i=0
    c.push(arr[0])
     while (i <=arr.length-1) {
    
    while (j<=c.length-1)
    {
        if(arr[i]==c[j]){
        a=1 
        break;}
        else a = 2
    }
    if(a==2)
    c.push(arr[i])
return c.length;
}
 
function countOfEachCharacterInString(str){
    if(typrOf(str) === "undefined")
    throw "You need to provide an Argument value"
    else if(typeof(str) !== "string")
    throw "You have not provided string argument"

    const strarr = str.split('')
    let strobj = {}

    strarr.forEach(l => {
        if(typeof strobj[l] === "undefined")
        strobj[l=1]
        else
        strobj[l]++
    })
    return strobj
}
module.export = {
deepEquality,
uniqueElements,
countOfEachCharacterInString
}
