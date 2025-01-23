const request = require('supertest');
const app = require('../server'); // This is your live app instance

let server; // Store the server instance
let port;   // Store the dynamically assigned port

beforeAll((done) => {
  server = app.listen(0, () => { // Pass 0 to let the OS assign an available port
    port = server.address().port; // Get the dynamically assigned port
    done();
  });
});

afterAll((done) => {
  server.close(done); // Close the server after all tests are complete
});

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
    done();
  },
  15000);
});
