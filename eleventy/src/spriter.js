const fs = require('fs');
const SVGSpriter = require('svg-sprite');

const spriteConfig = {
  mode: {
    symbol: true,
  },
  shape: {
    id: {
      generator: function (name, file) {
        return file.basename.slice(0, -4);
      },
    },
  },
  svg: {
    xmlDeclaration: false,
    doctypeDeclaration: false,
  },
};

const files = [
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/file.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/globe-americas.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/bell.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/cogs.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/bullseye.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/chart-line.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/lock.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/copy.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/search.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/car-side.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/heart-broken.svg',
  'node_modules/@fortawesome/fontawesome-free/svgs/solid/quote-left.svg',
];

let contents;

module.exports = async () => {
  try {
    if (!contents) {
      const spriter = new SVGSpriter(spriteConfig);
      files.forEach(i =>
        spriter.add(__dirname + i, null, fs.readFileSync(i), 'utf-8')
      );

      const compileSprite = async args => {
        return new Promise((resolve, reject) => {
          spriter.compile(args, (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result.symbol.sprite);
          });
        });
      };

      const result = await compileSprite(spriteConfig.mode);
      contents = result.contents;
    }
    return contents;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
