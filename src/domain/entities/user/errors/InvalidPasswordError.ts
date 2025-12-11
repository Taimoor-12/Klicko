class InvalidPasswordError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid password format');
    this.name = 'InvalidPasswordError';
  }
}

export default InvalidPasswordError;