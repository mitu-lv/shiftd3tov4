import {nsCall} from './transforms';

const convert = {
          source: 'd3',
          convertables: {
              'd3.scale.category20().range': 'schemeCategory20'
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
