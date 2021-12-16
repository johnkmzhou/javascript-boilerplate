const fs = require('fs');
const glob = require('fast-glob');
const md5 = require('md5');
const htmlmin = require('html-minifier');
const axiosPackage = require('./node_modules/axios/package.json');
const spriter = require('./src/spriter');

module.exports = function (eleventyConfig) {
  // cache busting
  eleventyConfig.addNunjucksShortcode('axiosVersion', function () {
    return axiosPackage.version;
  });

  // memoize value
  let cssHash;
  eleventyConfig.addShortcode('generateCssHash', function () {
    if (!cssHash) {
      // need to read all files that may have tailwind classes
      const cssFiles = glob.sync([
        `src/_includes/css/**/*.css`,
        'src/**/*.njk',
      ]);
      const cssContent = cssFiles
        .map(cssFile => fs.readFileSync(cssFile))
        .join('');
      cssHash = md5(cssContent).slice(0, 8);
    }
    return cssHash;
  });

  // memoize value
  let svgHash;
  eleventyConfig.addNunjucksAsyncShortcode('generateSvgHash', async () => {
    if (!svgHash) {
      const svgContent = await spriter();
      svgHash = md5(svgContent).slice(0, 8);
    }
    return svgHash;
  });

  // rebuild on CSS changes
  eleventyConfig.addWatchTarget('./src/_includes/css/');

  // STATIC FILES
  eleventyConfig.addPassthroughCopy({
    './src/static/': '/',
    './node_modules/axios/dist/axios.min.js': `js/axios@${axiosPackage.version}/dist/axios.min.js`,
  });

  // TRANSFORM -- Minify HTML Output
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
      data: './_data',
      includes: './_includes',
      layouts: './_layouts',
    },
    templateFormats: ['md', 'njk', '11ty.js'],
    htmlTemplateEngine: 'njk',
  };
};
