const path = require("path");
const nodeExternals = require("webpack-node-externals");
const JavaScriptObfuscator = require("webpack-obfuscator");
module.exports = {
    target: "node",
    entry: {
        index: "./index.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    node: "10.16"
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    externals: [nodeExternals()],
    resolveLoader: {
        modules: [`${__dirname}/node_modules`]
    },
    plugins: [
        new JavaScriptObfuscator(
            {
                rotateStringArray: true
            },
            ["index.js"]
        )
    ],
    node: {
        __dirname: false
    }
};
