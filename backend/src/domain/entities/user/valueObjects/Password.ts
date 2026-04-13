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
    return /[A-Z]/.test(value);
  }
}

export default Password;
