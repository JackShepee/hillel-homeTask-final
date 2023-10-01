module.exports = {
    "jest": {
        "testEnvironment": "jest-environment-jsdom"
    },
    "setupFilesAfterEnv": ['./localStorageMock.js'],
    "testEnvironment": "jsdom"
}
