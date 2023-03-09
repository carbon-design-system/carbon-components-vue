// vue.config.js
module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js'],
    },
    performance: {
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('min.js');
      },
      maxEntrypointSize: 300000,
      maxAssetSize: 300000,
    },
  },

  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {},
  },
};
