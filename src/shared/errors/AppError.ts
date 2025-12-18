class AppError extends Error {
  statusCode: number;
  details?: any;

  constructor({ 
    message, 
    statusCode = 400, 
    name = 'AppError',
    details
  }: {
    message: string,
    statusCode: number,
    name?: string,
    details?: any
  }) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
    this.details = details;
  }
}

export default AppError;