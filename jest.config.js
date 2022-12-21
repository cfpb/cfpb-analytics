const esModules = ['@cfpb/cfpb-atomic-component'].join('|');
const config = {
  testEnvironment: 'jsdom',
  transform: {},
  testPathIgnorePatterns: [`<rootDir>/../../node_modules/(?!${esModules})`]
};

export default config;
