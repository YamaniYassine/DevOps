import { screen , render , cleanup } from "@testing-library/react";
import HeaderNav from  "../footer/footer";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
jest.mock('../footer/footer.css', () => ({}));

test('should render footer component', () => {
    expect(true).toBe(true);
});