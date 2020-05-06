import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('baseElement learn react link', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
