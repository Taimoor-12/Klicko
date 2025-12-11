import InvalidPasswordError from "../errors/InvalidPasswordError.js";

class Password {
  private value: string;
  constructor(value: string) {
    if (!value) throw new InvalidPasswordError('Password cannot be empty');
    if (value.length < 8) throw new InvalidPasswordError('Password must be at least 8 characters long');
    if (!Password.hasUpperCase(value)) throw new InvalidPasswordError('Password must contain at least one uppercase letter');

    this.value = value;
  }

  getValue() {
    return this.value;
  }

  private static hasUpperCase(value: string) {
    const upperCaseChars = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const valueArr = this.toCharArray(value);

    for (const char of valueArr) {
      if (upperCaseChars.includes(char)) {
        return true;
      }
    }

    return false;
  }

  private static toCharArray(value: string) {
    return value.split("");
  }
}

export default Password;