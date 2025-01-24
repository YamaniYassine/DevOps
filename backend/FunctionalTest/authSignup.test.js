jest.mock('bcryptjs'); // Mock bcryptjs
const bcrypt = require('bcryptjs'); // Use bcryptjs

const { signup } = require('../controllers/authController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

describe('AuthController - Signup', () => {
  it('should signup a user and return token', async () => {
    User.create = jest.fn().mockResolvedValue({
      id: '12345',
      name: 'test',
      email: 'test@test.com',
    });

    bcrypt.hash = jest.fn().mockResolvedValue('mockHashedPassword');
    jwt.sign = jest.fn().mockReturnValue('mockToken123');

    const req = {
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'testtest',
        confirmPassword: 'testtest',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await signup(req, res, next);

    expect(bcrypt.hash).toHaveBeenCalledWith('testtest', expect.any(Number));
    expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test',
      email: 'test@test.com',
      password: 'mockHashedPassword',
    }));
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: '12345' },
      expect.any(String),
      { expiresIn: expect.any(String) }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 'success',
      data: expect.objectContaining({
        user: expect.any(Object),
        token: 'mockToken123',
      }),
    }));
    expect(next).not.toHaveBeenCalled();
  });
});
