// arithmetic.test.js
import { expect, test } from 'vitest';

import { sum, subtract, multiply, divide } from '@utils/arithmetic';

// Simple function tests

//Addition
test('adds 1 + 2 to equal 3', () => {
  const result = sum(1, 2);

  expect(result).toBe(3);
});

//Assignment

// Subtraction
test('subtracts 5 - 3 to equal 2', () => {
  expect(subtract(5, 3)).toBe(2);
});

// Multiplication
test('multiplies 4 * 3 to equal 12', () => {
  expect(multiply(4, 3)).toBe(12);
});

// Division
test('divides 10 / 2 to equal 5', () => {
  expect(divide(10, 2)).toBe(5);
});

// Division by zero (error case)
test('throws error when dividing by zero', () => {
  expect(() => divide(10, 0)).toThrow('Division by zero is not allowed.');
});