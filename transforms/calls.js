import {createObjectCallExpr} from '../utils';

function createFnCallExpression(j, n, replaceTo) {
    return j.callExpression(
        j.identifier(replaceTo),
        n.arguments
    );
}

function detectReplaceableType(replaceable) {
    const exprParts = replaceable.split('.');

    exprParts.reverse();

    const isCallExpresion = exprParts[0].indexOf('(') !== -1;

    if (isCallExpresion) {
        return 'CallExpression';
    }

    if (exprParts.length > 1) {
        return 'MemberExpression';
    }

    return 'Identifier';
}

function removeBraces(str) {
    const braceIdx = str.lastIndexOf('(');

    if (braceIdx === -1) {
        return str;
    } else {
        return str.substr(0, braceIdx);
    }
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
    // const { comments } = root.find(j.Program).get('body', 0).node;

    Object.keys(convertables).forEach(objectExprStr => {

        const findableType = detectReplaceableType(objectExprStr);

        // console.log('findableType', findableType);

        const query = createObjectCallExpr(objectExprStr, findableType),
              replaceables = root.find(j[findableType], query);

              let replaceTo = convertables[objectExprStr],
                  specImported,
                  specLocal;

              if (typeof replaceTo === 'object') {
                  const key = Object.keys(replaceTo)[0]
                  specImported = removeBraces(key);
                  specLocal = removeBraces(replaceTo[key]);
                  replaceTo = replaceTo[key];
              } else {
                  specImported = removeBraces(replaceTo.split('.')[0]);
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
                    const replaceToType = detectReplaceableType(replaceTo);
                    if (replaceToType === 'CallExpression') {
                        return createFnCallExpression(j, nodePath.node, removeBraces(replaceTo));
                    } else {
                        return j.identifier(replaceTo);
                    }
                });
        }
    });

    const importDeclarations = root.find(j.ImportDeclaration);

    if (importDeclarations.size()) {
        const lastImport = importDeclarations.at(importDeclarations.size() - 1);

        if(importables.length) {
            lastImport.insertAfter(
                j.importDeclaration(importables, j.literal(importSource))
            );
        }
    } else {
        if(importables.length) {
            root.find(j.Program).get('body', 0).insertBefore(
                j.importDeclaration(importables, j.literal(importSource))
            );
        }
    }

    // add preserved comments to top
    // root.get().node.comments = comments;
};
