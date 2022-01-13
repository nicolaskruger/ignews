module.exports = {
  testIgnorePatterns: ["/node_modules/", "/.next"],
  setUpFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_module/babel-jest",
  },
  testEnvironment: "jsdom",
};
