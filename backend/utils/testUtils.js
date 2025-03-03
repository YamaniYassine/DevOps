// backend/utils/testUtils.js

/**
 * Mock the request object.
 * @param {Object} body - The body of the request.
 * @param {Object} params - The parameters of the request.
 * @param {Object} query - The query parameters of the request.
 * @returns {Object} Mocked request object.
 */
const mockRequest = ({ body = {}, params = {}, query = {} } = {}) => ({
    body,
    params,
    query,
  });
  
  /**
   * Mock the response object.
   * Includes methods like status and json for chaining.
   * @returns {Object} Mocked response object.
   */
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res); //
    res.json = jest.fn().mockReturnValue(res); // 
    res.cookie = jest.fn();
    return res;
  };
  
  /**
   * Mock the next function.
   * Useful for capturing errors passed to next.
   * @returns {Function} Mocked next function.
   */
  const mockNext = () => jest.fn();
  
  module.exports = {
    mockRequest,
    mockResponse,
    mockNext,
  };
  