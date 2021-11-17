const md5 = require('md5');
const spriter = require('./spriter');

module.exports = class {
  async data() {
    try {
      const svgContent = await spriter();
      const svgHash = md5(svgContent).slice(0, 8);

      return {
        permalink: function () {
          return `/${svgHash}.sprite.svg`;
        },
        content: svgContent,
      };
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async render({ content }) {
    return content;
  }
};
