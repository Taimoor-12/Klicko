class IncorrectPasswordError extends Error {
  constructor(message?: string) {
    super(message ?? 'Password is incorrect');
    this.name = 'IncorrectPasswordError';
  }
}

export default IncorrectPasswordError;