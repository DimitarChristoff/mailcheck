var config = exports;

config["Browser tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        "source/*.js"
    ],
    tests: [
        "test/tests/*-test.js"
    ]
};