import {createObjectCallExpr} from '../utils';

function createFnCallExpression(j, n, replaceTo) {
    return j.callExpression(
        j.identifier(replaceTo),
        n.arguments
    );
}

/**
 * Converts namespaced call like d3.scale.linear to
 * something simple as scaleLinear
 *
 * @param  {function} j
 * @param  {object} root
 * @param  {object} convert object containing props:
 *         @property {string} source import from <source>
 *         @property {object} convertables object key contains FROM {string} and value TO {string}
 *         for now to value supports only simple function calls
 * @return {undefined}
 */
export function nsCall(j, root, convert) {
    const {convertables, source: importSource} = convert,
          importables = [];

    // preserve comments on top of file
    const { comments } = root.find(j.Program).get('body', 0).node;

    Object.keys(convertables).forEach(objectExprStr => {

        const query = createObjectCallExpr(objectExprStr),
              replaceables = root.find(j.CallExpression, query);

              let replaceTo = convertables[objectExprStr],
                  specImported,
                  specLocal

              if(typeof replaceTo === 'object') {
                  const key = Object.keys(replaceTo)[0]
                  specImported = key;
                  specLocal = replaceTo[key];
                  replaceTo = specLocal;
              } else {
                  specImported = replaceTo.split('.')[0];
                  specLocal = specImported;
              }

        if (replaceables.size() > 0) {
            importables.push(
                j.importSpecifier(
                    j.identifier(specImported),
                    j.identifier(specLocal)
                )
            );

            replaceables.replaceWith(nodePath => {
                    return createFnCallExpression(j, nodePath.node, replaceTo);
                });
        }
    });

    const importDeclarations = root.find(j.ImportDeclaration);

    if (importDeclarations.size()) {
        const lastImport = importDeclarations.at(importDeclarations.size() - 1);

        lastImport.insertAfter(
            j.importDeclaration(importables, j.literal(importSource))
        );
    } else {
        root.find(j.Program).get('body', 0).insertBefore(
            j.importDeclaration(importables, j.literal(importSource))
        );
    }

    // add preserved comments to top
    root.get().node.comments = comments;
};
