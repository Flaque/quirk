module.exports = {
  preset: "jest-expo",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  globals: {
    "ts-jest": {
      tsConfig: {
        jsx: "react",
      },
    },
  },
};
