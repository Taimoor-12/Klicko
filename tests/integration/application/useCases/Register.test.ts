import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import RegisterUseCase from '../../../../src/application/useCases/registerUser/UseCase.js';
import client from '../../../../src/infrastructure/database/client.js';
import UserRepository from '../../../../src/infrastructure/database/implementations/UserRepository.js';
import HashPasswordService from '../../../../src/infrastructure/security/HashPasswordService.js';
import TokenService from '../../../../src/infrastructure/security/TokenService.js';
import UserAlreadyExistsError from '../../../../src/domain/entities/user/errors/UserAlreadyExistsError';

describe('register use case', () => {
  const useCase = new RegisterUseCase({
    userRepository: new UserRepository(client),
    tokenService: new TokenService(),
    hashPasswordService: new HashPasswordService()
  });

  const TEST_EMAIL = 'register-test@example.com';

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

  it('registers a new user successfully', async () => {
    const result = await useCase.execute({
      email: TEST_EMAIL,
      password: 'Password123',
      name: 'Test'
    });

    expect(result.user).toBeDefined();
    expect(result.user.id).toBeDefined();
    expect(result.user.email).toBe(TEST_EMAIL);
    expect(result.user.name).toBe('Test');
    
    expect(result.token).toBeDefined();
  });

  it('registers a new user even when no name is provided', async () => {
    const result = await useCase.execute({
      email: TEST_EMAIL,
      password: 'Password123',
    });

    expect(result.user).toBeDefined();
    expect(result.user.id).toBeDefined();
    expect(result.user.email).toBe(TEST_EMAIL);
    expect(result.user.name).toBe('');
    
    expect(result.token).toBeDefined();
  });

  it('throws when an email already exists', async () => {
    await useCase.execute({
      email: TEST_EMAIL,
      password: 'Password123',
      name: 'Existing'
    });

    await expect(useCase.execute({
      email: TEST_EMAIL,
      password: 'Password123',
      name: 'Existing',
    })).rejects.toThrow(UserAlreadyExistsError);
  });
});
