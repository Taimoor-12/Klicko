import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import client from '../../../src/infrastructure/database/client.js';
import app from '../setup.js';

describe('POST /api/auth/login', () => {
  const TEST_EMAIL = 'login-endpoint-test@example.com'; 

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
    await request(app)
      .post('/api/auth/register')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.email).toBe(TEST_EMAIL);
  });

  it('returns 401 if the user does not exist', async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));

    expect(loginResponse.status).toBe(401);
  });

  it('returns 401 if the password is incorrect', async () => {
    await request(app)
      .post('/api/auth/register')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send(({
        email: TEST_EMAIL,
        password: 'Password1234',
        name: 'Test'
      }));

    expect(loginResponse.status).toBe(401);
  });

  it('returns 422 on missing required fields', async() => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(({
        name: "https://google..commm"
      }));
    
    expect(response.status).toBe(422);
    expect(response.body.details).toBeDefined();
  });

  it('returns 400 on missing body', async() => {
    const response = await request(app)
      .post('/api/auth/login')
      .send();
    
    expect(response.status).toBe(400);
  });

  it('sets authToken cookie on successful login', async() => {
    await request(app)
      .post('/api/auth/register')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));
    
    const response = await request(app)
      .post('/api/auth/login')
      .send(({
        email: TEST_EMAIL,
        password: 'Password123',
        name: 'Test'
      }));

    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0]).toContain('authToken');
  });
});
