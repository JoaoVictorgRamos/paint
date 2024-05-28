const dotenv = require("dotenv");
dotenv.config();

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
