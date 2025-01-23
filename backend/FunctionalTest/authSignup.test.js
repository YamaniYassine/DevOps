const request = require('supertest');
const app = require('../server'); // This is your live app instance

describe('AuthController - Signup API', () => {
  it('should signup a user and return token if valid data is provided', async () => {
    const res = await request(app)  // Test against live server
      .post('/users/signup')
      .send({
        name: 'test',
        email: 'test@test.com',
        password: 'testtest',
        confirmPassword: 'testtest',
      });

    expect(res.status).toBe(200);  // Check if the status is 200 OK
    expect(res.body.status).toBe('success');  // Check if the response status is success
    expect(res.body.data).toHaveProperty('user');  // Check if the user object exists
    expect(res.body.data).toHaveProperty('token');  // Check if the token is returned
  });
});
