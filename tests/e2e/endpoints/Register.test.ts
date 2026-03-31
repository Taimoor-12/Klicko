import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import createApp from '../../../src/setup/app.js';
import client from '../../../src/infrastructure/database/client.js';

const app = createApp();

describe('POST /api/auth/register', () => {
  const TEST_EMAIL = 'register-endpoint-test@example.com';

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

  it('returns 200 with user data on valid input', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));
    
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(TEST_EMAIL);
  });

  it('returns 409 when email already exists', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));

    const response = await request(app)
      .post('/api/auth/register')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));
    
    expect(response.status).toBe(409);
  });

  it('returns 422 on invalid email format', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(({
        email: 'test@examplecom',
        password: "Password123",
      }));
    
    expect(response.status).toBe(422);
  });

  it('returns 422 on invalid password format', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(({
        email: TEST_EMAIL,
        password: "password123", // password must have at least one uppercase char
      }));
    
    expect(response.status).toBe(422);
  });

  it('returns 422 on missing required fields', async() => {
    const response = await request(app)
      .post('/api/auth/register')
      .send(({
        longUrl: "https://google..commm"
      }));
    
    expect(response.status).toBe(422);
    expect(response.body.details).toBeDefined();
  });

  it('returns 400 on missing body', async() => {
    const response = await request(app)
      .post('/api/auth/register')
      .send();
    
    expect(response.status).toBe(400);
  });
});
