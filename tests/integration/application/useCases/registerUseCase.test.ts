import { describe, it, expect, afterEach } from 'vitest';
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

  afterEach(async () => {
    await client.user.deleteMany({
      where : { email: { in: ['test@example.com', 'test2@example.com', 'existing@example.com'] }}
    })
  });

  it('registers a new user successfully', async () => {
    const result = await useCase.execute({
      email: 'test@example.com',
      password: 'Password123',
      name: 'Test'
    });

    expect(result.user).toBeDefined();
    expect(result.user.id).toBeDefined();
    expect(result.user.email).toBe('test@example.com');
    expect(result.user.name).toBe('Test');
    
    expect(result.token).toBeDefined();
  });

  it('registers a new user even when no name is provided', async () => {
    const result = await useCase.execute({
      email: 'test2@example.com',
      password: 'Password123',
    });

    expect(result.user).toBeDefined();
    expect(result.user.id).toBeDefined();
    expect(result.user.email).toBe('test2@example.com');
    expect(result.user.name).toBe('');
    
    expect(result.token).toBeDefined();
  });

  it('throws when an email already exists', async () => {
    await useCase.execute({
      email: 'existing@example.com',
      password: 'Password123',
      name: 'Existing'
    });

    await expect(useCase.execute({
      email: 'existing@example.com',
      password: 'Password123',
      name: 'Existing',
    })).rejects.toThrow(UserAlreadyExistsError);
  });
});
