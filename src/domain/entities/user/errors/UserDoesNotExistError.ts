class UserDoesNotExistError extends Error {
  constructor(message?: string) {
    super(message ?? 'User does not exist');
    this.name = 'UserDoesNotExistError';
  }
}

export default UserDoesNotExistError;