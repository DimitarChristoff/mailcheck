var config = exports;

config["Browser tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        "Source/*.js"
    ],
    tests: [
        "test/tests/*-test.js"
    ]
};