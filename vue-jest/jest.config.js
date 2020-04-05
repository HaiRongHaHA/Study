module.exports = {
    preset: "@vue/cli-plugin-unit-jest",
    testURL: "http://localhost/",
    moduleFileExtensions: ["js", "json", "vue"],
    transform: {
        // 测试的时候如何转化
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
    },
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1"
    }
};
