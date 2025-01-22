const { signup } = require('../controllers/authController');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const { mockRequest, mockResponse, mockNext } = require('../utils/testUtils');

let server;

beforeAll((done) => {
  server = app.listen(5001, done); // Start server before tests
});

afterAll((done) => {
  server.close(done); // Close the server after tests
});


jest.mock('../models/userModel'); // Mock the User model
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockToken'),
}));

describe('AuthController - Signup', () => {
  it('should return error if required fields are missing', async () => {
    const req = mockRequest({ body: {} });
    const res = mockResponse();
    const next = mockNext();

    await signup(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const error = JSON.parse(next.mock.calls[0][0].message);
    expect(error).toHaveProperty('name', 'Name is required');
    expect(error).toHaveProperty('email', 'Email is required');
    expect(error).toHaveProperty('password', 'Password is required');
    expect(error).toHaveProperty('confirmPassword', 'Confirm Password is required');
  });

  it('should return error if passwords do not match', async () => {
    const req = mockRequest({
      body: { name: 'test', email: 'test@test.com', password: 'testtest', confirmPassword: 'wrongtest' },
    });
    const res = mockResponse();
    const next = mockNext();

    await signup(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const error = JSON.parse(next.mock.calls[0][0].message);
    expect(error).toHaveProperty('incorrectconfirmation', "passwords don't match");
  });

  it('should return error if email is already in use', async () => {
    User.findOne.mockResolvedValueOnce({ email: 'test@test.com' }); // Mock existing user
    const req = mockRequest({
      body: { name: 'test', email: 'test@test.com', password: 'testtest', confirmPassword: 'testtest' },
    });
    const res = mockResponse();
    const next = mockNext();

    await signup(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const error = JSON.parse(next.mock.calls[0][0].message);
    expect(error).toHaveProperty('alreadyused', 'emal already used');
  });
});
