class UserAlreadyExistsError extends Error {
  statusCode: number;
  
  constructor({ message = 'User already exists'} : { message: string }) {
    super(message);
    this.name = 'UserAlreadyExistsError';
    this.statusCode = 409;
  }
}

export default UserAlreadyExistsError;