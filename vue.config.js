module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("null-loader")
      .loader("null-loader");
  },
};
