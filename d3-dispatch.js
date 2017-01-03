import {nsCall} from './transforms';

const convert = {
          source: 'd3-dispatch',
          convertables: {
              'd3.dispatch()': { 'dispatch': 'd3dispatch()' }
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
