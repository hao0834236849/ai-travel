const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  };
  config.resolver = {
    ...resolver,
    sourceExts: [...resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'],
  };

  return config;
})();
