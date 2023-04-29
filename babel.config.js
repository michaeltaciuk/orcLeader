module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": [
          "API_URL",
        ],
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
    ]
  };
};
