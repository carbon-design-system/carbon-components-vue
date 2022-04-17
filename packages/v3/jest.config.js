module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/*/**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/*.stories.js',
    '!**/*.spec.js',
    '!**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 0,
    },
  },
  transformIgnorePatterns: ['/node_modules/(?!@carbon)'],
};
