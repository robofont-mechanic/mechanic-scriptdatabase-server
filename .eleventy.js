module.exports = function (eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    files: './_site/static/**/*.css',
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
  };
};