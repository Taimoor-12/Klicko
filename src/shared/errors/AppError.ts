class AppError extends Error {
  statusCode: number;

  constructor({ 
    message, 
    statusCode = 400, 
    name = 'AppError' 
  }: {
    message: string,
    statusCode: number,
    name?: string
  }) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

export default AppError;