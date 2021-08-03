export function nicknameValidator(value) {
  if (value.length < 2 || value.length > 10) {
    return { isValid: false, errorMessage: "2~16글자를 입력해주세요." };
  } else {
    return { isValid: true, errorMessage: "" };
  }
}

export function emailValidator(value) {
  const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const result = reg.test(value);
  if (result) {
    return { isValid: true, errorMessage: "" };
  } else {
    return { isValid: false, errorMessage: "이메일 형식으로 입력하세요" };
  }
}

export function passwordValidator(value) {
  if (value.length < 6 || value.length > 18) {
    return { isValid: false, errorMessage: "6~18글자를 입력해주세요." };
  } else {
    return { isValid: true, errorMessage: "" };
  }
}
