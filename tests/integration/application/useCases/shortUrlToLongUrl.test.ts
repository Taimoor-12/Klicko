import { describe, expect, it, beforeEach, afterEach } from "vitest";
import RegisterUseCase from '../../../../src/application/useCases/registerUser/UseCase.js';
import LoginUseCase from '../../../../src/application/useCases/loginUser/UseCase.js';
import LongUrlToShortUrlUseCase from '../../../../src/application/useCases/longUrlToShortUrl/UseCase.js';
import ShortUrlToLongUrlUseCase from '../../../../src/application/useCases/ShortUrlToLongUrl/UseCase.js';
import dbClient from '../../../../src/infrastructure/database/client.js';
import UserRepository from '../../../../src/infrastructure/database/implementations/UserRepository.js';
import HashPasswordService from '../../../../src/infrastructure/security/HashPasswordService.js';
import TokenService from '../../../../src/infrastructure/security/TokenService.js';
import LinkRepository from '../../../../src/infrastructure/database/implementations/LinkRepository.js';
import LinkSequenceRepository from '../../../../src/infrastructure/database/implementations/LinkSequenceRepository.js';
import cacheClient from '../../../../src/infrastructure/memory-store/client.js';
import CacheStore from '../../../../src/infrastructure/memory-store/implementations/CacheStore.js'
import getEnv from '../../../../src/shared/utils/getEnv.js';
import ShortCodeDoesNotExistError from "../../../../src/domain/entities/link/errors/ShortCodeDoesNotExistError.js";

describe('short url to long url use case', () => {
  const registerUseCase = new RegisterUseCase({
    userRepository: new UserRepository(dbClient),
    hashPasswordService: new HashPasswordService(),
    tokenService: new TokenService()
  });

  const loginUseCase = new LoginUseCase({
    userRepository: new UserRepository(dbClient),
    hashPasswordService: new HashPasswordService(),
    tokenService: new TokenService()
  });

  const baseUrl = getEnv('BASE_URL');
  const longUrlToShortUrl = new LongUrlToShortUrlUseCase({
    linkRepository: new LinkRepository(dbClient),
    linkSequenceRepository: new LinkSequenceRepository(dbClient),
    baseUrl
  });

  const shortUrlToLongUrl = new ShortUrlToLongUrlUseCase({
    linkRepository: new LinkRepository(dbClient),
    cacheStore: new CacheStore(cacheClient)
  });

  const TEST_EMAIL = 'short-url-to-long-test@example.com';

  beforeEach(async () => {
    await dbClient.$queryRaw`TRUNCATE TABLE "Link" RESTART IDENTITY`;
    await dbClient.$queryRaw`ALTER SEQUENCE link_sequence RESTART WITH 0`;

    await dbClient.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    });
  });

  afterEach(async () => {
    await dbClient.$queryRaw`TRUNCATE TABLE "Link" RESTART IDENTITY`;
    await dbClient.$queryRaw`ALTER SEQUENCE link_sequence RESTART WITH 0`;

    await dbClient.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    })
  });

  it('retrives the long url from the short url successfully', async () => {
    await registerUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const loginResult = await loginUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const longUrl = 'https://google.com/';
    await longUrlToShortUrl.execute({
      userId: loginResult.user.id,
      longUrl
    });

    const queryResult = await dbClient.$queryRaw<{shortCode: string}[]>`SELECT "shortCode" FROM "Link" WHERE "userId" = ${loginResult.user.id}`;

    const result = await shortUrlToLongUrl.execute({
      shortCode: queryResult[0].shortCode
    });


    expect(result).toBeDefined();
    expect(result.longUrl).toBe(longUrl);
  });

  it('throw when short code does not exist', async () => {
    await expect(shortUrlToLongUrl.execute({
      shortCode: 'Bjp'
    })).rejects.toThrow(ShortCodeDoesNotExistError);
  });
  
  it('caches the long url after first retrieval', async () => {
    await registerUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const loginResult = await loginUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const longUrl = 'https://google.com/';
    await longUrlToShortUrl.execute({
      userId: loginResult.user.id,
      longUrl
    });

    const queryResult = await dbClient.$queryRaw<{shortCode: string}[]>`SELECT "shortCode" FROM "Link" WHERE "userId" = ${loginResult.user.id}`;

    const shortCode = queryResult[0].shortCode;
    await shortUrlToLongUrl.execute({
      shortCode
    });

    const cached = await cacheClient.get(shortCode);
    expect(cached).toBe('https://google.com/')
  });

  it('serves long url from cache on second request', async () => {
    await registerUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const loginResult = await loginUseCase.execute({
      email: TEST_EMAIL,
      password: 'Password123'
    });

    const longUrl = 'https://google.com/';
    await longUrlToShortUrl.execute({
      userId: loginResult.user.id,
      longUrl
    });

    const queryResult = await dbClient.$queryRaw<{shortCode: string}[]>`SELECT "shortCode" FROM "Link" WHERE "userId" = ${loginResult.user.id}`;

    const shortCode = queryResult[0].shortCode;
    await shortUrlToLongUrl.execute({
      shortCode
    });

    await dbClient.$queryRaw`TRUNCATE TABLE "Link" RESTART IDENTITY`;

    const result = await shortUrlToLongUrl.execute({
      shortCode
    });

    expect(result.longUrl).toBe('https://google.com/')
  });
});
