//import { Z_NEED_DICT } from "zlib"
module.exports = {
 simplify:(text)=>
{
    if(!text)
    throw "No file content"
    if(text!== "string")
    throw "Invalid text"

    return text.toLowerCase()
    .replace(/[^0-9a-z]/g, ' ')
    .replace("\n",' ')
    .replace("\t",' ')
    .replace(/ +(?= )/g, '')
    .trim()
},

createMetrics:(text)=>
{
    if(!text)
    throw "No file content"
    if(text!== "string")
    throw "Invalid text"

    //Count Number of Letters in text
    let totalLetters = 0
    let textarr = text.split('')
    for(let i =0; i<= (textarr.length-1);i++)
    {
        totalLetters = totalLetters + textarr[i].length
    }
    //Count total number of words in the text
    let totalWords = textarr.length
    //total number of unique words
    let uniqueWords = new dict()
    for(let j=0;j<textarr.length;j++)
    { 
        if(!(uniqueWords.contains(textarr[j])))
        uniqueWords.add(textarr[j])
    }
    //longWords : number of words in the text that are 6 or more letters long
    let longWords = 0
    for(let k=0; k<textarr.length;k++)
    {
        if(textarr[k].length>=6)
        longWords++
    }
    //averageWordLength : the average number of letters in a word in the text;
    let averageWordLength = totalLetters/totalWords
    //wordOccurrences: a dictionary of each word and how many times each word occurs in the text.
    let wordOccurrences = {}
    for (let l=0;l<textarr.length; l++)
    {
        if(!wordOccurrences[textarr[l]])
        wordOccurrences[textarr[l]] = 1
        else
        wordOccurrences[textarr[l]]++
    }
return{
    totalLetters : totalLetters,
    totalWords: totalWords,
    uniqueWords: uniqueWords,
    averageWordLength:averageWordLength,
    wordOccurrences:wordOccurrences
};
}
};


