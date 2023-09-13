
import type { JestConfigWithTsJest } from 'ts-jest'
import BabelConfig from './babel.config'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./setupTests.ts"],
  transform: {
    '^.+\\.(tsx|ts)?$': [
      'ts-jest',
      {
        babelConfig: BabelConfig,
      },
    ],
  },
  modulePathIgnorePatterns: ["<rootDir>/e2e"],
  moduleNameMapper: {
    '@/components/Common': "<rootDir>/components/Common",
  }
}

export default jestConfig