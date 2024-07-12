const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const env = process.env.NODE_ENV || "development";
const envFile = env === "development" ? ".env.dev" : ".env.prod";

if (fs.existsSync(path.resolve(__dirname, envFile))) {
  dotenv.config({ path: path.resolve(__dirname, envFile) });
}

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("null-loader")
      .loader("null-loader");
  },
});
