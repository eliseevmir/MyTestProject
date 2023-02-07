import { Configuration } from "webpack";
import path from "node:path";
import NodemonPlugin from 'nodemon-webpack-plugin';

const config: Configuration = {
  target: "node",
  entry: {
    index: path.resolve(__dirname, "../src/index.ts"),
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.resolve(__dirname, "../build"),
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new NodemonPlugin({
      watch: ['./build'],
      exec: 'node ./build/index.js',
    })
  ],
};

export default config;
