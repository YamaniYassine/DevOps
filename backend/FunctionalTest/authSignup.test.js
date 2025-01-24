jest.mock('../models/userModel'); // Mock the User model
jest.mock('jsonwebtoken'); // Mock the token generation library
jest.mock('bcryptjs'); // Mock bcrypt for password hashing

const { signup } = require('../controllers/authController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

describe('AuthController - Signup', () => {
  it('should signup a user and return token', async () => {
    // Mock User.create to simulate database behavior
    User.create = jest.fn().mockResolvedValue({
      id: '12345',
      name: 'test2',
      email: 'test2@test.com',
    });

    // Mock bcrypt.hash to simulate password hashing
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword123');

    // Mock jwt.sign to simulate token creation
    jwt.sign = jest.fn().mockReturnValue('mockToken123');

    // Mock request, response, and next objects
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

    const next = jest.fn(); // Mock next function

    // Call the signup function
    await signup(req, res, next);

    // Assertions
    expect(bcrypt.hash).toHaveBeenCalledWith('testtest', expect.any(Number)); // Ensure password is hashed
    expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test2',
      email: 'test2@test.com',
      password: 'hashedPassword123',
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

    // Ensure next was not called (no errors)
    expect(next).not.toHaveBeenCalled();
  });
});
