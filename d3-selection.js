import {nsCall} from './transforms';

const convert = {
          source: 'd3-selection',
          convertables: {
              'd3.select()': 'select()',
              'd3.event': 'event',
              'd3.mouse()': 'mouse()'
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
