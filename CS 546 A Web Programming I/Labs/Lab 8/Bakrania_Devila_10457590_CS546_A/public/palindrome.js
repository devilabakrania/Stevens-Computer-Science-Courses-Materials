
function palindrome(){
    let text = document.getElementById("text").value;
    let rmvChar = text.replace(/[^A-Z0-9]/ig, "").toLowerCase();
    let checkPalindrome = rmvChar.split('').reverse().join('');
    if(checkPalindrome === rmvChar)
      alert("Your string is a Palindrome")
      //window.location.href = 'posts/index'

       //$("#checker").append("<li class='success'>"+text+" is a Palindrome number</li>")
    else
       alert("Your string is not a Palindrome")
       //window.location.href = 'posts/index'
       //$("#checker").append("<li class='failure'>"+text+" is not a Palindrome number</li>")      
}
//var check=checkPalindromeNumber(text)
//if(!check)
// {
     
// }
// else{
   
// }     




