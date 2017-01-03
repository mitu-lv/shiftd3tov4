import {nsCall} from './transforms';

const convert = {
          source: 'd3-array',
          convertables: {
              'd3.min()': 'min()'
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
