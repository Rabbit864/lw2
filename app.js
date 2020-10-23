let authUserData = false;
let userDatabase = [];

function checkValidEmail(email) {
  let regularExpressionForCheckingMail = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpressionForCheckingMail.test(email);
}

function hasDigitPassword(password) {
  let digits = "0123456789";
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

function register(email, password) {
  if (!checkValidEmail(email)) {
    return "Email невалиден";
  }
  if (!checkValidPassword(password)) {
    return "Пароль невалиден";
  }
  user = {
    email: email,
    password: password,
  };
  for (let i = 0; i < userDatabase.length; i++) {
    if (
      userDatabase[i].email === email
    ) {
      return "Данный пользователь уже зарегистрирован";
    }
  }
  userDatabase.push(user);
  return "Пользователь успешно добавлен";
}

function signIn(email, password) {
  if (!checkValidEmail(email)) {
    return "Email невалиден";
  }
  if (!checkValidPassword(password)) {
    return "Пароль невалиден";
  }
  for (let i = 0; i < userDatabase.length; i++) {
    if (
      userDatabase[i].email === email &&
      userDatabase[i].password === password
    ) {
      authUserData = true;
      return "Вы успешно авторизовались";
    } else {
      return "Вы не зарегистрированы";
    }
  }
}

function signOut() {
  authUserData = false;
  return "Вы успешно вышли";
}

function resetPassword(email, oldPassword, newPassword) {
  if (!checkValidEmail(email)) {
    return "Email невалиден";
  }
  if (!checkValidPassword(oldPassword)) {
    return "Старый пароль невалиден";
  }
  if (!checkValidPassword(newPassword)) {
    return "Новый пароль невалиден";
  }
  for (let i = 0; i < userDatabase.length; i++) {
    if (
      userDatabase[i].email === email &&
      userDatabase[i].password === oldPassword
    ) {
      userDatabase[i].password = newPassword;
      return "Пароль успешно изменён";
    } else {
      return "Пользователя с таким email и паролем не существует";
    }
  }
}

function isAuth() {
  return authUserData;
}

function validator(value) {
  return {
    flag: false,
    equal(array) {
      return array.toString() === value.toString();
    },
    isArray() {
      if (Array.isArray(value)) {
        return this;
      } else {
        return false;
      }
    },
    isString() {
      if (typeof value === "string") {
        return true;
      } else {
        return false;
      }
    },
    isNumber() {
      if (typeof value === "number") {
        return this;
      } else {
        return false;
      }
    },
    min(minValue){
      if (value >= minValue){
        return this;
      }
      else {
        return false;
      }
    },
    max(maxValue){
      if (value <= maxValue){
        return true;
      }
      else {
        return false;
      }
    },
  };
}

console.log("Первая часть задания");
console.log(register("smyshlyaev12@list.ru", "Pass123"));
console.log(signIn("smyshlyaev12@list.ru", "Pass123"));
console.log(isAuth());
console.log(signOut());
console.log(resetPassword("smyshlyaev12@list.ru", "Pass123", "Passs123"));
console.log(resetPassword("smyshlyaev12@list.ru", "Pass123", "Passs123"));
console.log(isAuth());

console.log("Вторая часть задания");
console.log(validator("1").isArray());
console.log(validator([]).isArray().equal([1, 2, 3]));
console.log(validator([1, 2, 3]).isArray().equal([1, 2, 3]));
console.log(validator("1").isString());
console.log(validator("1").isNumber());
console.log(validator(10).isNumber().min(10));
console.log(validator(10).isNumber().min(4).max(9));