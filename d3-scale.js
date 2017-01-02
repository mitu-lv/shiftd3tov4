import {nsCall} from './transforms';

const convert = {
          source: 'd3-scale',
          convertables: {
              'd3.scale.linear': 'scaleLinear',
              'd3.scale.ordinal': 'scaleOrdinal'
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
