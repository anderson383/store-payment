/* eslint-disable lines-around-comment */
const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/helpers/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/node_modules/'
  ],
  coverageThreshold: {global: {
    branches: 0,
    functions: 0,
    lines: 0,
    statements: 0
  }},
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(svg)$': '<rootDir>/svg/svg-mock.js',
    '\\.module.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '^.+\\.(css|less|scss)$': '<rootDir>/node_modules/jest-css-modules',
    ...pathsToModuleNameMapper({
      "@/*": ["./src/*"]
    }, { prefix: '<rootDir>/' })
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {'^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }]},
  unmockedModulePathPatterns: [
    '<rootDir>/node_modules/react'
  ]
};
