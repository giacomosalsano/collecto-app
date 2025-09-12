// Jest setup file
// This file runs before each test file

// Suppress console logs IMMEDIATELY to prevent dotenv logs
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Suppress logs immediately (before any imports)
console.log = jest.fn();
console.error = jest.fn();

beforeAll(() => {
  // Ensure logs are suppressed (redundant but safe)
  console.log = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  // Restore console logs after tests
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

// Global test timeout
jest.setTimeout(10000);
