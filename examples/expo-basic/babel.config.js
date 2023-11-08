module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      ['module-resolver', {
        alias: {
           // 'react-native-web-nami-sdk': '../../src',
           // 'react-nami': '../../../react-nami/src'
        },
      }]
    ]
  };
};


