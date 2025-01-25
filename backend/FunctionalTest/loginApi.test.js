// loginApi.test.js
import fetch from 'node-fetch';
import { expect } from '@jest/globals';

const loginApi = 'http://152.42.139.102:5001/users/login';
const testUser  = {
  username: 'test',
  password: 'testtest'
};


describe('Login API', () => {
  it('should return a successful response with valid credentials', async () => {
    const response = await fetch(loginApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser )
    });
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token');
  });

  it('should return an error response with invalid credentials', async () => {
    const invalidUser  = {
      username: 'test',
      password: 'wrongpassword'
    };
    const response = await fetch(loginApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invalidUser )
    });
    expect(response.status).toBe(401);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });

  it('should return an error response with missing credentials', async () => {
    const response = await fetch(loginApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    expect(response.status).toBe(400);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('error');
  });
});