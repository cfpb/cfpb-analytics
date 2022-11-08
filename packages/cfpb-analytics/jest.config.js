const esModules = ['@cfpb/cfpb-atomic-component'].join('|');
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [`<rootDir>/../../node_modules/(?!${esModules})`]
};
