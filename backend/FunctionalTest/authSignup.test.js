const request = require('supertest');
const app = require('../server'); // Your Express app instance

describe('AuthController - Login', () => {
  it('should login a user and return a token if valid credentials are provided', async () => {
    const res = await request(app) // Send the request to the live server
      .post('/users/login') // Your login endpoint
      .send({
        email: 'test@test.com', // The email to test
        password: 'testtest',    // The password to test
      });

    // Assertions
    expect(res.status).toBe(200);  // Check if the status is 200 OK
    expect(res.body.status).toBe('success');  // Check if the response status is success
    expect(res.body.data).toHaveProperty('user');  // Check if the user object exists
    expect(res.body.data).toHaveProperty('token');  // Check if the token is returned
  });

  it('should return an error if invalid credentials are provided', async () => {
    const res = await request(app) // Send the request to the live server
      .post('/users/login') // Your login endpoint
      .send({
        email: 'wrongemail@test.com', // Invalid email
        password: 'wrongpassword',    // Invalid password
      });

    // Assertions for error case
    expect(res.status).toBe(400);  // Check if the status is 400 for invalid credentials
    expect(res.body.status).toBe('fail');  // Check if the response status is fail
    expect(res.body.message).toBe('Email or password incorrect');  // Check for the correct error message
  },
    600000
  );
});
