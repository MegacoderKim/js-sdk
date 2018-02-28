const path = require('path');

module.exports = (storybookBaseConfig, configType) => {
  // Here storybookBaseConfig.module.rules[3]) is the following:
  // {
  //	test: /\.scss$/,
  //	loaders: [
  //		'C:\\git\\foo\\node_modules\\raw-loader\\index.js',
  //		'C:\\git\\foo\\node_modules\\sass-loader\\lib\\loader.js'
  //	]
  // }

  // The following works:
  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ['to-string-loader', "style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, '../')
  });

  // Return the altered config
  return storybookBaseConfig;
};
