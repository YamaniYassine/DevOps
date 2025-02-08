import fetch from 'node-fetch';
import { expect } from '@jest/globals';

const baseUrl = 'http://152.42.139.102:5001/users';
const testUserEmail = 'test2@test.com';

describe('User Deletion API', () => {
  let userId = null;

  it('should find the user created by signup and delete it', async () => {
    // Retrieve all users (or use a dedicated search endpoint if available)
    const getResponse = await fetch(`${baseUrl}`);
    expect(getResponse.status).toBe(200);
    const getData = await getResponse.json();
    
    // Find the user by email
    const foundUser = getData.users.find(u => u.email === testUserEmail);
    expect(foundUser).toBeDefined();
    userId = foundUser._id;
    
    // Delete the user using the user ID
    const deleteResponse = await fetch(`${baseUrl}/${userId}`, {
      method: 'DELETE',
    });
    expect(deleteResponse.status).toBe(200);
    const deleteData = await deleteResponse.json();
    expect(deleteData.success).toBe(true);
    expect(deleteData.message).toBe("User deleted successfully");
  });
});
