import {nsCall} from './transforms';

const convert = {
          source: 'd3-array',
          convertables: {
              'd3.min': 'min',
              'd3.max': 'max',
              'd3.sum': 'sum',
              'd3.range': 'range'
          }
      };

function transformer(file, api) {
    const j = api.jscodeshift,
          root = j(file.source);

    nsCall(j, root, convert);

    // root.find(j.CallExpression, {
    //           callee: {
    //               type: 'MemberExpression',
    //               object: { type: 'Identifier', name: 'd3' },
    //               property: { type: 'Identifier', name: 'max' }
    //           }
    //       }).replaceWith(np => {
    //             const {node: n} = np;

    //             return j.callExpression(
    //                 j.identifier('max'),
    //                 n.arguments
    //             );
    //       });

    // root.find(j.CallExpression, {
    //           callee: {
    //               type: 'MemberExpression',
    //               object: { type: 'Identifier', name: 'd3' },
    //               property: { type: 'Identifier', name: 'min' }
    //           }
    //       }).replaceWith(np => {
    //             const {node: n} = np;

    //             return j.callExpression(
    //                 j.identifier('min'),
    //                 n.arguments
    //             );
    //       });

    // const importDeclarations = root.find(j.ImportDeclaration);

    // if (importDeclarations.size()) {
    //     const lastImport = importDeclarations.at(importDeclarations.size() - 1);

        // lastImport.replaceWith(p => {
        //     const {node} = p;
        //     return [
        //     node,
        //     j.importDeclaration([j.importSpecifier(j.identifier('min')), j.importSpecifier(j.identifier('max'))], j.literal('d3-array'))
        //     ];
        // });

    //     lastImport.insertAfter(
    //         j.importDeclaration(importables, j.literal(importSource))
    //     );
    // }

  // })
  //   .replaceWith(
  //     p => j.identifier(p.node.name.split('').reverse().join(''))
  //   )

    return root.toSource({
        quote: 'single',
        reuseWhitespace: false
    });
}

module.exports = transformer;
