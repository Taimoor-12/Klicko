import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import client from '../../../src/infrastructure/database/client.js';
import app from '../setup.js';
import TestAgent from 'supertest/lib/agent.js';

describe('POST /api/urls/shorten', () => {
  const TEST_EMAIL = 'long-to-short-endpoint-test@example.com';
  let agent: TestAgent; 

  beforeEach(async () => {
    const user = await client.user.findUnique({ where: { email: TEST_EMAIL } });
    if (user) {
      await client.link.deleteMany({ where: { userId: user.id } });
    }

    await client.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    });

    agent = request.agent(app);
    
    await agent.post('/api/auth/register').send({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      });
    
    
    await agent.post('/api/auth/login').send({
        email: TEST_EMAIL,
        password: 'Password123',
      });
  });

  afterEach(async () => {
    const user = await client.user.findUnique({ where: { email: TEST_EMAIL } });
    if (user) {
      await client.link.deleteMany({ where: { userId: user.id } });
    }

    await client.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    })
  });

  it('returns 201 with a short url', async () => {
    const longToShortResponse = await agent
        .post('/api/urls/shorten')
        .send({ longUrl: 'https://google.com'});

    
    expect(longToShortResponse.status).toBe(201);
    expect(longToShortResponse.body.shortUrl).toBeDefined();
  });

  it('returns 400 when provided with invalid long url', async () => {
    const longToShortResponse = await agent
        .post('/api/urls/shorten')
        .send({ longUrl: 'ftp://google.com'});

    
    expect(longToShortResponse.status).toBe(400);
  });

  it('returns 400 when provided with invalid url protocol', async () => {
    const longToShortResponse = await agent
        .post('/api/urls/shorten')
        .send({ longUrl: 'www.google.com'});

    
    expect(longToShortResponse.status).toBe(400);
  });

  it('returns 401 to unauthorized users', async () => {
    const longToShortResponse = await request(app)
      .post('/api/urls/shorten')
      .send({ longUrl: 'https://www.google.com' });

    
    expect(longToShortResponse.status).toBe(401);
  });

  it('returns 400 when the request body is empty', async () => {
    const longToShortResponse = await agent
        .post('/api/urls/shorten')
        .send();

    
    expect(longToShortResponse.status).toBe(400);
  });

  it('returns 422 when the required field is missing', async () => {
    const longToShortResponse = await agent
        .post('/api/urls/shorten')
        .send({ name: 'Test' });

    
    expect(longToShortResponse.status).toBe(422);
    expect(longToShortResponse.body.details).toBeDefined();
  });
});
