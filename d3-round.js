import {nsCall} from './transforms';

const convert = {
          source: '../math',
          convertables: {
              'd3.round': 'math.round'
          }
      };

function transformer(file, api) {
    const j = api.jscodeshift,
          root = j(file.source);

    nsCall(j, root, convert);

    return root.toSource({
        quote: 'single',
        reuseWhitespace: false
    });
}

module.exports = transformer;
