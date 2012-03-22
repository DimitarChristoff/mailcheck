var config = exports;

config["Browser tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    libs: ['test/lib/mootools-yui-compressed.js'],
    sources: [
        "src/*.js"
    ],
    tests: [
        "test/tests/*-test.js"
    ]
};