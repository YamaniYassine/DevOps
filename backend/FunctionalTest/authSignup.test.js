const request = require('supertest');
const app = require('../server'); // Your Express app instance

let server;

beforeAll((done) => {
  server = app.listen(0, () => { // Start server on an available port
    done();
  });
});

afterAll((done) => {
  server.close(done); // Close the server after tests
});

describe('AuthController - Login', () => {
  it('should login a user and return a token', async () => {
    const res = await request(server) // Use the live server
      .post('/users/login')
      .send({
        email: 'test@test.com',
        password: 'testtest',
      });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data).toHaveProperty('user');
    expect(res.body.data).toHaveProperty('token');
  });
});
