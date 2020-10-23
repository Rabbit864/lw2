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
    if (userDatabase[i].email === email) {
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
    isValid: false,
    equal(equalValue) {
      if (value.toString() === equalValue.toString()) {
        this.isValid = true;
        return this;
      } else {
        this.isValid = false;
        return this;
      }
    },
    isFloat() {
      if (Number(value) === value && value % 1 !== 0) {
        this.isValid = true;
        return this;
      } else {
        return this;
      }
    },
    isDate() {
      let arrayDate = value.split(".");
      if (arrayDate.length !== 3) {
        return this;
      }
      arrayDate[1] -= 1;
      let date = new Date(arrayDate[2], arrayDate[1], arrayDate[0]);
      if (
        date.getFullYear().toString() === arrayDate[2].toString() &&
        date.getMonth().toString() === arrayDate[1].toString() &&
        date.getDate().toString() === arrayDate[0].toString()
      ) {
        this.isValid = true;
        return this;
      } else {
        return this;
      }
    },
    isArray() {
      if (Array.isArray(value)) {
        this.isValid = true;
        return this;
      } else {
        return this;
      }
    },
    isString() {
      if (typeof value === "string") {
        this.isValid = true;
        return this;
      } else {
        return this;
      }
    },
    isNumber() {
      if (typeof value === "number") {
        this.isValid = true;
        return this;
      } else {
        return this;
      }
    },
    min(minValue) {
      if (value >= minValue) {
        this.isValid = true;
        return this;
      } else {
        this.isValid = false;
        return this;
      }
    },
    max(maxValue) {
      if (value <= maxValue) {
        this.isValid = true;
        return this;
      } else {
        this.isValid = false;
        return this;
      }
    },
    maxLength(maxValue) {
      if (value.length <= maxValue) {
        this.isValid = true;
        return this;
      } else {
        this.isValid = false;
        return this;
      }
    },
    minLength(minValue) {
      if (value.length >= minValue) {
        this.isValid = true;
        return this;
      } else {
        this.isValid = false;
        return this;
      }
    },
    validate() {
      return this.isValid;
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
console.log("test isArray");
console.log(validator("1").isArray().validate());
console.log(validator([123]).isArray().validate());
console.log("test isString");
console.log(validator("1").isString().validate());
console.log(validator([123]).isString().validate());
console.log("test isNumber");
console.log(validator("1").isNumber().validate());
console.log(validator([123]).isNumber().validate());
console.log(validator(1).isNumber().validate());
console.log("test isDate");
console.log(validator("25.12.1993").isDate().validate());
console.log(validator("2").isDate().validate());
console.log("test isDate");
console.log(validator(2.123).isFloat().validate());
console.log(validator(2).isFloat().validate());
console.log("test min");
console.log(validator(10).isNumber().min(1).validate());
console.log(validator(10).isNumber().min(10).validate());
console.log(validator(10).isNumber().min(11).validate());
console.log("test max");
console.log(validator(10).isNumber().max(1).validate());
console.log(validator(10).isNumber().max(10).validate());
console.log(validator(10).isNumber().max(11).validate());
console.log(validator(10).isNumber().min(4).max(9).validate());
console.log(validator(10).isNumber().min(4).max(11).validate());
console.log("test minLength with isString");
console.log(validator("10").isString().minLength(1).validate());
console.log(validator("10").isString().minLength(10).validate());
console.log("test minLength with isArray");
console.log(validator([111]).isArray().minLength(1).validate());
console.log(validator([111, 1, 2, 3]).isArray().minLength(10).validate());
console.log("test maxLength with isArray");
console.log(validator([111]).isArray().maxLength(5).validate());
console.log(validator([111, 1, 2, 3]).isArray().maxLength(3).validate());
console.log("test maxLength with isString");
console.log(validator("103").isString().maxLength(5).validate());
console.log(validator("1034").isString().maxLength(3).validate());
console.log("test equal");
console.log(validator([]).isArray().equal([1, 2, 3]).validate());
console.log(validator([1, 2, 3]).isArray().equal([1, 2, 3]).validate());
console.log(validator("[1, 2, 3]").isString().equal("[1, 2, 3]").validate());
console.log(validator("[1, 2, 3]").isString().equal("[2, 3, 1]").validate());
console.log(validator(10).isNumber().equal(10).validate());
console.log(validator(101).isNumber().equal(10).validate());
