import {createObjectCallExpr} from 'utils';
const importSource = 'd3-array';
const convertables = {
  'd3.max' => 'max'
  'd3.min' => 'min'
};

function transformer(file, api) {
    const j = api.jscodeshift,
          root = j(file.source);

    Object.keys(convertables).forEach(objectExprStr => {
        
        const query = createObjectCallExpr(objectExprStr);

        root.find(j.CallExpression, query).replaceWith(np => {
                      const {node: n} = np;
        
                      return j.callExpression(
                          j.identifier(convertables[objectExprStr]),
                          n.arguments
                      );
                  });
    });

    // root.find(j.CallExpression, {
    //           callee: {
    //               type: 'MemberExpression',
    //               object: { type: 'Identifier', name: 'd3' },
    //               property: { type: 'Identifier', name: 'max' },
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
    //               property: { type: 'Identifier', name: 'min' },
    //           }
    //       }).replaceWith(np => {
    //             const {node: n} = np;
                
    //             return j.callExpression(
    //                 j.identifier('min'),
    //                 n.arguments
    //             );
    //       });

    const importDeclarations = root.find(j.ImportDeclaration);

    if (importDeclarations.size()) {
        const lastImport = importDeclarations.at(importDeclarations.size() - 1);

        // lastImport.replaceWith(p => {
        //     const {node} = p;
        //     return [
        //     node,
        //     j.importDeclaration([j.importSpecifier(j.identifier('min')), j.importSpecifier(j.identifier('max'))], j.literal('d3-array'))
        //     ];
        // });
        
        lastImport.insertAfter(
            j.importDeclaration([j.importSpecifier(j.identifier('min')), j.importSpecifier(j.identifier('max'))], j.literal('d3-array'))
        );
    }

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
