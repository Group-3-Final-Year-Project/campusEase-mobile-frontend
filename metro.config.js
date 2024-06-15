// // Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig, mergeConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);
config.resolver.sourceExts.push("cjs");
config.resolver.sourceExts.push("svg");
config.resolver.assetExts.push("svg");
config.transformer.minifierConfig = {
  compress: {
    // The option below removes all console logs statements in production.
    drop_console: true,
  },
};
module.exports = config;
