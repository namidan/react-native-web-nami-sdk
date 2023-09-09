const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const escape = require('escape-string-regexp');
const blacklist = require('metro-config/src/defaults/exclusionList');

const pak = require('../../package.json');

const root = path.resolve(__dirname, '../..');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

const modules = [...Object.keys(pak.peerDependencies)];

const config = {
  ...defaultConfig,

  projectRoot: __dirname,

  watchFolders: [
    ...defaultConfig.watchFolders,
    path.resolve(__dirname, '../..'),
    path.resolve(__dirname, '../../../react-nami')
  ],
  resolver: {
    ...defaultConfig.resolver,
    blacklistRE: blacklist(
        modules.map(
            (m) =>
                new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
        )
    ),
    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
    // Adding 'mjs' to the list of file extensions for react-markdown package
    sourceExts: [...(defaultConfig.resolver.sourceExts || []), 'mjs']
  },

  transformer: {
    ...defaultConfig.transformer,
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = config;



