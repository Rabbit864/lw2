let authUserData = null;
let userDatabase = [];

function checkValidEmail(email) {
  let regularExpressionForCheckingMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpressionForCheckingMail.test(email);
}

function hasDigitPassword(password) {
  let digits = '0123456789';
  let isDigit = false;
  for (let i = 0; i < password.length; i++) {
    if (digits.indexOf(password[i] !== -1)) {
      isDigit = true;
    }
  }
  return isDigit;
}

function checkValidPassword(password) {
  if (
    password.length >= 6 &&
    hasDigitPassword(password) &&
    password.charAt(0).toUpperCase() === password.charAt(0)
  ) {
    return true;
  }
  return false;
}

function register(email,password){
  if(!checkValidEmail(email)){
    return 'Email невалиден';
  }
  if(!checkValidPassword(password)){
    return 'Password невалиден';
  }
  user = {
    email : email,
    password : password
  };
  userDatabase.push(user);
  return "Пользователь успешно добавлен";
}

console.log(register('smyshlyaev12@list.ru','Pass123'));
console.log(userDatabase);

