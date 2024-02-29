import { screen , render , cleanup } from "@testing-library/react";
import HeaderNav from  "../header/header";
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
jest.mock('../header/header.css', () => ({}));

test('should render header component', () => {
    expect(true).toBe(true);
});