module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      "react-native-iconify/plugin",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "~graphql": "./src/graphql",
            "~components": "./src/components",
            "~validations": "./src/validations",
            "~shared": "src/shared",
            "~screens": "src/screens",
            "~hooks": "src/hooks",
            "~navigators": "src/navigators",
            "~components/*": "src/components/*",
            "~themes": "./src/themes",
            "~store": "./src/store",
            "~reducers": "./src/store/reducers",
            "~views": "./src/views",
            "~services": "./src/services",
            "~assets": "./src/assets",
            "~images": "./src/assets/images",
            "~animations": "./src/assets/animations",
            "~config": "./src/config",
            "~src": "./src",
          },
        },
      ],
    ],
  };
};
