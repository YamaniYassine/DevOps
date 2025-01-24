const { signup } = require('../controllers/authController');

it('should signup a user and return token', async () => {
  const req = { body: { name: 'test', email: 'test@test.com', password: 'testtest', confirmPassword: 'testtest' } };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await signup(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
    status: 'success',
    data: expect.objectContaining({
      user: expect.any(Object),
      token: expect.any(String),
    }),
  }));
});
