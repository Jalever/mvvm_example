const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist")
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    port: 8004,
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "MVVM Example",
      template: "./src/index.html",
      filename: "index.html"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
      // Templates: path.resolve(__dirname, 'src/templates/')
    }
  }
};
