export function createObjectCallExpr(objectExprStr) {
    const exprParts = objectExprStr.split('.');

    exprParts.reverse();

    // example of query searching for d3.max() call
    // {
    //     callee: {
    //         type: 'MemberExpression'
    //         object: { type: 'Identifier', name: 'd3' },
    //         property: { type: 'Identifier', name: 'max' },
    //     }
    // }

    const out = {
              callee: {}
          },
          partCount = exprParts.length;

    let count = 1;

    console.log('exprParts', exprParts);

    exprParts.reduce((acc, pt) => {
        if (count === partCount) {
            acc.type = 'Identifier';
            acc.name = pt;
        } else {
            acc.type = 'MemberExpression';

            const callIndex = pt.indexOf('(');
            // a call expresion
            if(callIndex !== -1) {
                acc.type = 'CallExpression';
                acc.callee = {
                    object: { type: 'MemberExpression' },
                    property: { type: 'Identifier', name: pt.substr(0, callIndex) }
                };
            } else {
                acc.object = { type: 'MemberExpression' };
                acc.property = { type: 'Identifier', name: pt };
            }
        }

        count++;

        return acc.type === 'CallExpression' ? acc.callee.object : acc.object;
    }, out.callee);

    console.log(JSON.stringify(out));

    return out;
}
