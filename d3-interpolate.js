import {nsCall} from './transforms';

const convert = {
          source: 'd3-interpolate',
          convertables: {
              'd3.interpolate': 'interpolate',
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
