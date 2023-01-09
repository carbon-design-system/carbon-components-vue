// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': undefined,
      },
      extensions: ['.js'],
    },
    performance: {
      maxEntrypointSize: 768000,
      maxAssetSize: 768000,
    },
    // plugins: [
    //   new CopyWebpackPlugin({
    //     patterns: [{ from: "public", to: "wibble", toType: "dir" }]
    //   })
    // ]
  },

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {},
  },

  css: {
    extract: true, // FALSE: causes a problem with SSR, prefer :style
  },
};
