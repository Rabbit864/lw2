function isValidEmail(email) {
  let regularExpressionForCheckingMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regularExpressionForCheckingMail.test(email) === false) {
    return false;
  }
  return true;
}
function checkingValidatePassword(password){
  let digits = "0123456789";
  let isDigit = false;
  for(let i = 0; i < password.length; i++){
    if(digits.indexOf(password[i] != -1)){
      isDigit = true;
    }
  }
  if(password.length >= 6 &&
    isDigit &&
    password.charAt(0).toUpperCase() === password.charAt(0)){
    return true;
  }
  return false;
}
