//let palindrome = document.getElementById("button")
(function($){
let palindrome = function(text) {
  text = text.replace(/[^a-z0-9]+/ig,'').toLowerCase()
  let reversedStr = text.split('').reverse().join('')
  if (text === reversedStr)
  return text
  else return false
}
$("#form1").submit(function(event){
    let insertedtext = $('#phrase').val()
    if(!insertedtext){
      if($('#form1.error').length == 0){$('#form1').append("<p class='error'> You have clicked submit with empty textarea box. Please enter string</p>")}
      event.preventDefault()
      return
    }
    let attemptsList = $('#attempts')
    let insertedstring = $('<li></li>')
    let isstringpalindrome = palindrome(insertedtext)
    //let lowercase = isstringpalindrome.replace(/[^a-z0-9]+/ig,'').toLowerCase()
    let insertedtextClass = (isstringpalindrome) ? 'is-palindrome' : 'not-palindrome'
    insertedstring.addClass(insertedtextClass)
    insertedstring.html(insertedtext + ((isstringpalindrome) ? ' is a palindrome' :' is not a palindrome'))
    attemptsList.append(insertedstring)
    if($('#form1.error') != undefined){$('#form1.error').remove()}
    event.preventDefault()
})})(jQuery)
