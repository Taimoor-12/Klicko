class InvalidLongUrlError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid Long Url');
    this.name = 'InvalidLongUrlError';
  }
}

export default InvalidLongUrlError;
