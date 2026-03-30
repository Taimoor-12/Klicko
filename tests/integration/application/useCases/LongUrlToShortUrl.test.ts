import { describe, expect, it, beforeEach, afterEach } from "vitest";
import RegisterUseCase from '../../../../src/application/useCases/registerUser/UseCase.js';
import LoginUseCase from '../../../../src/application/useCases/loginUser/UseCase.js';
import LongUrlToShortUrlUseCase from '../../../../src/application/useCases/longUrlToShortUrl/UseCase.js';
import client from '../../../../src/infrastructure/database/client.js';
import UserRepository from '../../../../src/infrastructure/database/implementations/UserRepository.js';
import HashPasswordService from '../../../../src/infrastructure/security/HashPasswordService.js';
import TokenService from '../../../../src/infrastructure/security/TokenService.js';
import LinkRepository from '../../../../src/infrastructure/database/implementations/LinkRepository.js';
import LinkSequenceRepository from '../../../../src/infrastructure/database/implementations/LinkSequenceRepository.js';
import getEnv from '../../../../src/shared/utils/getEnv.js'

describe('long url to short url use case', () => {
  const registerUseCase = new RegisterUseCase({
    userRepository: new UserRepository(client),
    hashPasswordService: new HashPasswordService(),
    tokenService: new TokenService()
  });

  const loginUseCase = new LoginUseCase({
    userRepository: new UserRepository(client),
    hashPasswordService: new HashPasswordService(),
    tokenService: new TokenService()
  });

  const baseUrl = getEnv('BASE_URL');
  const longUrlToShortUrl = new LongUrlToShortUrlUseCase({
    linkRepository: new LinkRepository(client),
    linkSequenceRepository: new LinkSequenceRepository(client),
    baseUrl
  });

  const TEST_EMAIL = 'long-url-to-short-test@example.com';

  beforeEach(async () => {
    await client.$queryRaw`TRUNCATE TABLE "Link" RESTART IDENTITY`;
    await client.$queryRaw`ALTER SEQUENCE link_sequence RESTART WITH 0`;

    await client.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    });
  });

  afterEach(async () => {
    await client.$queryRaw`TRUNCATE TABLE "Link" RESTART IDENTITY`;
    await client.$queryRaw`ALTER SEQUENCE link_sequence RESTART WITH 0`;

    await client.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    })
  });

  it('converts long url to short url successfully', async () => {
    await registerUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const loginResult = await loginUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const result = await longUrlToShortUrl.execute({
      userId: loginResult.user.id,
      longUrl: 'https://google.com',
    });

    expect(result.shortUrl).toBeDefined();
  });
});
