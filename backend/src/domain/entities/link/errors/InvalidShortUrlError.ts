class InvalidShortUrlError extends Error {
  constructor(message?: string) {
    super(message ?? 'Invalid Short Url');
    this.name = 'InvalidShortUrlError';
  }
}

export default InvalidShortUrlError;
