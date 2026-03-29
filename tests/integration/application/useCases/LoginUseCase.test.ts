import { describe, it, expect, afterEach, beforeEach } from "vitest";
import RegisterUseCase from '../../../../src/application/useCases/registerUser/UseCase.js';
import LoginUseCase from '../../../../src/application/useCases/loginUser/UseCase.js';
import client from '../../../../src/infrastructure/database/client.js';
import UserRepository from '../../../../src/infrastructure/database/implementations/UserRepository.js';
import HashPasswordService from '../../../../src/infrastructure/security/HashPasswordService.js';
import TokenService from '../../../../src/infrastructure/security/TokenService.js';
import UserDoesNotExistError from '../../../../src/domain/entities/user/errors/UserDoesNotExistError.js';
import IncorrectPasswordError from '../../../../src/domain/entities/user/errors/IncorrectPasswordError.js';


describe('login use case', () => {
  const registerUseCase = new RegisterUseCase({
    userRepository: new UserRepository(client),
    tokenService: new TokenService(),
    hashPasswordService: new HashPasswordService()
  });

  const loginUseCase = new LoginUseCase({
    userRepository: new UserRepository(client),
    tokenService: new TokenService(),
    hashPasswordService: new HashPasswordService()
  });

  const TEST_EMAIL = 'login-test@example.com';

  beforeEach(async () => {
    await client.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    })
  });

  afterEach(async () => {
    await client.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    })
  });

  it('logs in the existing user successfully', async () => {
    await registerUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123',
      name: 'Test'
    });
    
    const result = await loginUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123',
    });

    expect(result.user).toBeDefined();
    expect(result.user.id).toBeDefined();
    expect(result.user.email).toBe(TEST_EMAIL);
    expect(result.user.name).toBe('Test');
    
    expect(result.token).toBeDefined();
  });
});
