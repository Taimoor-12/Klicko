class Email {
  private value: string; 
  constructor(value: string) {
    if (!Email.isValid(value)) throw new Error('Invalid Email');

    this.value = value.toLowerCase();
  }

  getValue() {
    return this.value;
  }

  static isValid(value: string): boolean {
    if (!value || typeof value !== 'string') return false;
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(value); 
  }
}

export default Email;