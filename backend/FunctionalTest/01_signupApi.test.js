import fetch from 'node-fetch';
import https from 'https';
import { expect } from '@jest/globals';

const signupApi = 'https://152.42.139.102:5001/users/signup';
const testUser = {
  name: 'test2',
  email: 'test2@test.com',
  password: 'testtest',
  confirmPassword: 'testtest',
};

// Create an HTTPS agent that ignores invalid SSL certificates
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // WARNING: This should only be used in testing environments.
});

describe('Signup API', () => {
  it('should return a successful response with valid credentials', async () => {
    const response = await fetch(signupApi, {
      method: 'POST',
      agent: httpsAgent, // use the custom HTTPS agent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data).toHaveProperty('token');
  });

  it('should return an error response with password too short', async () => {
    const invalidUser = {
      name: 'test2',
      email: 'test2@test.com',
      password: 'short',
      confirmPassword: 'short',
    };
    const response = await fetch(signupApi, {
      method: 'POST',
      agent: httpsAgent, // use the custom HTTPS agent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidUser),
    });
    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });

  it('should return an error response with missing credentials', async () => {
    const response = await fetch(signupApi, {
      method: 'POST',
      agent: httpsAgent, // use the custom HTTPS agent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });

  it('should return an error response with mismatched passwords', async () => {
    const invalidUser = {
      name: 'test2',
      email: 'test2@test.com',
      password: 'testtest',
      confirmPassword: 'wrongpassword',
    };
    const response = await fetch(signupApi, {
      method: 'POST',
      agent: httpsAgent, // use the custom HTTPS agent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidUser),
    });
    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });

  it('should return an error response with duplicate email', async () => {
    const response = await fetch(signupApi, {
      method: 'POST',
      agent: httpsAgent, // use the custom HTTPS agent
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });
    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });
});
