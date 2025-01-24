jest.mock('../models/userModel'); // Mock the User model
jest.mock('jsonwebtoken'); // Mock the token generation library

const { signup } = require('../controllers/authController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

describe('AuthController - Signup', () => {
  it('should signup a user and return token', async () => {
    // Mock User.create to simulate database behavior
    User.create = jest.fn().mockResolvedValue({
      id: '12345',
      name: 'test2',
      email: 'test2@test.com',
    });

    // Mock jwt.sign to simulate token creation
    jwt.sign = jest.fn().mockReturnValue('mockToken123');

    // Mock request and response objects
    const req = {
      body: {
        name: 'test2',
        email: 'test2@test.com',
        password: 'testtest',
        confirmPassword: 'testtest',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the signup function
    await signup(req, res);

    // Assertions
    expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test2',
      email: 'test2@test.com',
      password: expect.any(String), // Ensure the password is hashed
    }));

    expect(jwt.sign).toHaveBeenCalledWith(
      { id: '12345' }, // Payload
      expect.any(String), // Secret key
      { expiresIn: expect.any(String) } // Options
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 'success',
      data: expect.objectContaining({
        user: expect.objectContaining({
          id: '12345',
          name: 'test2',
          email: 'test2@test.com',
        }),
        token: 'mockToken123',
      }),
    }));
  });
});
