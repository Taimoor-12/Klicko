class ShortCodeDoesNotExistError extends Error {
  constructor(message?: string) {
    super(message ?? 'Short code does not exist');
    this.name = 'ShortCodeDoesNotExistError';
  }
}

export default ShortCodeDoesNotExistError;
