class InvalidProtocolError extends Error {
  constructor(message?: string) {
    super(message ?? 'Only HTTP/HTTPS URLs allowed');
    this.name = 'InvalidProtocolError';
  }
}

export default InvalidProtocolError;
