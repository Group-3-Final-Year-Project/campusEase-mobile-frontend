module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "module-resolver",
      "react-native-iconify/plugin",
      "react-native-reanimated/plugin",
    ],
  };
};
