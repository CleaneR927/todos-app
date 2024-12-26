const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function override(config, env) {
  const lessLoader = {
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] // css-loader для интерпретации @import и url(), как import/require(), и их разрешения. less-loader для компиляции LESS в CSS.
  };

  // Добавление загрузчика LESS в существующие правила
  config.module.rules.push(lessLoader);

  // Добавление MiniCssExtractPlugin в плагины
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  );

  return config;
};
