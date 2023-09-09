const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "index.ts",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      ".json",
      ".mjs",
      ".web.js",
      ".web.mjs",
      ".mjs.js",
    ],
    alias: {
      "react-native$": "react-native-web",
      "react-nami": path.resolve(__dirname, "../react-nami/src/index"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    react: "commonjs react",
    "react-dom": "commonjs react-dom",
    "react-native-web": "commonjs react-native-web",
  },
};
