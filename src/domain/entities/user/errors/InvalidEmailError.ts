class InvalidEmailError extends Error {
  constructor(message?: string) {
    super(message ?? 'Email is invalid');
    this.name = 'InvalidEmailError';
  }
}

export default InvalidEmailError;