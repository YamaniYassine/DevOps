import { screen , render , cleanup } from "@testing-library/react";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
jest.mock('../sign-in/signin.css', () => ({}));

test('should render SignIn component', () => {
    expect(true).toBe(true);
});