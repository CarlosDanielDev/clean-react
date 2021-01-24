module.exports = {
    roots: ['<rootDir>/src</rootDir>'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{ts,tsx}</rootDir>'
    ],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    transform: {
        '.+\\ts$': 'ts-jest'
    }
}