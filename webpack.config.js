const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: "./src/index.tsx",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "custom-elements/raised-bed-design.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [{ from: "assets", to: "dist/assets" }],
    // }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "inline-source-map";
    config.devServer = {
      contentBase: "./dist",
    };
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      })
    );
  }

  if (argv.mode === "production") {
    //...
  }

  return config;
};
