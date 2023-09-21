const path = require("path")
module.exports = {
    mode: "production",
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist",
        filename: "epii-work-pool.js",
        library: "WorkPool",
        libraryTarget: "umd",
        globalObject: 'this'
    },
    externals: {

    }
};