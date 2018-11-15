const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  mode: "production",
  plugins: [new CleanWebpackPlugin(["./dist"])]
};
