// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
  defaultConfig.resolver.sourceExts.push('cjs');
  defaultConfig.resolver.sourceExts.push('mjs');
  return defaultConfig;
})();



