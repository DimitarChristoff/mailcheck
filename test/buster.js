var config = exports;

config["Browser tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        "src/*.js"
    ],
    tests: [
        "test/tests/*-test.js"
    ]
};