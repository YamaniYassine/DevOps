module.exports = {
  testEnvironment: "node",
  maxWorkers: 1,
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(node-fetch|fetch-blob)/)'],
  moduleNameMapper: {
    '^formdata-polyfill$': '<rootDir>/node_modules/formdata-polyfill/dist/formdata-polyfill.min.js',
  },
};