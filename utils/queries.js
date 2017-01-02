export function createObjectCallExpr(objectExprStr) {
    // const exprParts = objectExprStr.split('.');
    const exprParts = objectExprStr.split('.').reverse();
    // const property = exprParts.pop();
    
    const out = {
        callee: {
            // type: 'MemberExpression'
            // object: { type: 'Identifier', name: 'd3' },
            // property: { type: 'Identifier', name: 'max' },
        }
    },
    partCount = exprParts.length;

    if (partCount === 1) {
        out.callee.type = 'Identifier';
        out.callee.name = exprParts[0];
    } else {
        exprParts.length
        _.reduce(exprParts, (acc, pt) => {

            return acc;
        }, out);
    }

    exprParts.reverse();



}
