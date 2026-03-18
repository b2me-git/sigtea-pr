module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@app': './src/app',
            '@modules': './src/modules',
            '@shared': './src/shared',
            '@shared/ui': './src/shared/ui',
            '@shared/hooks': './src/shared/hooks',
            '@shared/utils': './src/shared/utils',
            '@shared/services': './src/shared/services',
            '@shared/types': './src/shared/types',
            '@store': './src/store',
            '@config': './src/config',
            '@types': './src/shared/types',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
