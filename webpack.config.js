const path = require('path');
var JsDocPlugin = require('jsdoc-webpack4-plugin')

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
  plugins: [
    new JsDocPlugin({ conf: './jsdoc.conf' })
  ]
}