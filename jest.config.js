module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '\\.svg$': 'jest-transform-stub'
  }
};
