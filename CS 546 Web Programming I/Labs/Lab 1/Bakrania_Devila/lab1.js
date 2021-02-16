const questionOne = function questionOne(arr){
    //Implement question 1 here
    let sum = 0;
    for(let i=0;i<=arr.length-1;i++){
      result = Math.pow(arr[i],2);
      sum +=result;
    }
     return sum;
}
const questionTwo = function questionTwo(num){
    //Implement question 2 here
       if (num<1)
          return 0
        else if(num ==1)
          return 1
        else
          return questionTwo(num-1)+questionTwo(num-2)
}
const questionThree = function questionThree(text){
    //Implement question 3 here
     let vowels = text.match(/[aeiou]/gim);
     //g - Performs a global match 
     //i - Performs case-sensitive matching
     //m - Performs multiline matching
     if(vowels)
         return vowels.length
     else
         return 0
}
const questionFour = function questionFour(num){
    //Implement question 4 here
    if(num ==0)
      return 1
    else if(num<0)
      return NaN
    else
      return(num*questionFour(num-1))
}
module.exports = {
    firstName: "DEVILA",
    lastName: "BAKRANIA",
    studentID: "10457590",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};