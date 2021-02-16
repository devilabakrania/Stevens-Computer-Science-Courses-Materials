const words ={
    programming: "The action or process of writing computer programs.",
    charisma: "A personal magic of leadership arousing special popular loyalty or enthusiasm for a public figure (such as a political leader)",
    sleuth: "To act as a detective : search for information",
    foray: "A sudden or irregular invasion or attack for war or spoils : raid",
    adjudicate: "to make an official decision about who is right in (a dispute) : to settle judicially"
}
function checkInput(str)
{
    if(typeof str != 'string')
    {
        throw "It is not a string!";
    }
    else{
        return str;
    }
}
function lookupDefinition(input)
{
    checkInput(input);
    if(words[input]!=undefined)
    {
        return words[input]
    }
    else{
        throw "Not valid";
    }
}
function getWord(input2)
{
    checkInput(input2)
    const word = Object.keys(words).find(key=>words[key]===input2);
    if(word!=undefined){
        return word;
    }
    else{
        throw "Key Unavailable";
    } 
}
module.exports={
    lookupDefinition,
    getWord};
//})

//}
