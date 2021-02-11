// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.jsonl'],
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
