class UserAlreadyExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'User already exists');
    this.name = 'UserAlreadyExistsError';
  }
}

export default UserAlreadyExistsError;