module.exports = {
  reporters: [ "default", "jest-junit" ],
  setupFilesAfterEnv: ["./jest.setup.js"],
  coverageDirectory: './coverage/',
  "testResultsProcessor": "jest-sonar-reporter",
  "coverageReporters": ["html", "text", "text-summary", "cobertura", "lcov"],
  "testMatch": ["**/*.test.js"]
};
