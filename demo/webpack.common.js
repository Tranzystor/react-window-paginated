const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const aliases = require("./aliases.js");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { babelrcRoots: [".", "../"] } // <-- this line fixed it!
      }
    ]
  },
  resolve: aliases,
  devtool: "inline-source-map",
  plugins: [new CleanWebpackPlugin(["./dist"]), htmlWebpackPlugin]
};
