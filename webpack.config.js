const path = require('path');

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "verly.bundle.js",
    // library: "Verly",
    // libraryTarget: 'window',
    // globalObject: 'this'
  },
} 