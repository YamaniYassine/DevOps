module.exports = {
  testEnvironment: "node",
  maxWorkers: 1,
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(node-fetch|fetch-blob|formdata-polyfill)/)'],
};