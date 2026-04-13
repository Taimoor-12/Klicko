import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request, { agent, Response } from 'supertest';
import dbClient from '../../../src/infrastructure/database/client.js';
import app from '../setup.js';
import TestAgent from 'supertest/lib/agent.js';

describe('GET /:shortCode', () => {
  const TEST_EMAIL = 'short-to-long-endpoint-test@example.com';
  let agent: TestAgent;

  beforeEach(async () => {
    const user = await dbClient.user.findUnique({ where: { email: TEST_EMAIL }});

    if (user) {
      await dbClient.link.deleteMany({ where: { userId: user.id }});
    }

    await dbClient.user.deleteMany({
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
    const user = await dbClient.user.findUnique({ where: { email: TEST_EMAIL } });
    if (user) {
      await dbClient.link.deleteMany({ where: { userId: user.id } });
    }

    await dbClient.user.deleteMany({
      where : { email: { in: [TEST_EMAIL] }}
    })
  });

  it('returns 302, indicating it redirected to the long url', async () => {
    const longToShortResponse = await agent
        .post('/api/urls/shorten')
        .send({ longUrl: 'https://google.com'});

    const shortUrl = longToShortResponse.body.shortUrl;
    const shortCode = shortUrl.split('/').pop();

    const shortToLongUrlRes = await request(app)
        .get(`/${shortCode}`)

    expect(shortToLongUrlRes.status).toBe(302);
  });

  it('returns 404 when the short code is invalid', async () => {
    const shortCode = '*ab#';
    const shortToLongUrlRes = await request(app)
        .get(`/${shortCode}`)

    expect(shortToLongUrlRes.status).toBe(404);
  });

  it('returns 404 when the short code does not exist', async () => {
    const shortCode = 'aaaaaaaaaaaaaaa';
    const shortToLongUrlRes = await request(app)
        .get(`/${shortCode}`)

    expect(shortToLongUrlRes.status).toBe(404);
  });
});
