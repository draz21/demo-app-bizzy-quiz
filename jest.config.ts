
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./setupTests.ts"],
  transform: {
    '^.+\\.(tsx|ts)?$': [
      'ts-jest',
      {
        babelConfig: true,
      },
    ],
  },
  moduleNameMapper: {
    '@/components/Common': "<rootDir>/components/Common",
  }
}

export default jestConfig