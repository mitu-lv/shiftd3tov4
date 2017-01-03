export function createObjectCallExpr(objectExprStr, type) {
    const exprParts = objectExprStr.split('.'),
          partCount = exprParts.length;

    exprParts.reverse();

    // example of query searching for d3.max() call
    // {
    //     callee: {
    //         type: 'MemberExpression'
    //         object: { type: 'Identifier', name: 'd3' },
    //         property: { type: 'Identifier', name: 'max' },
    //     }
    // }
    let out = {};
    let queryRef;

    switch (type) {
        case 'CallExpression':
            exprParts[0] = exprParts[0].substr(0, exprParts[0].indexOf('('))
            queryRef = out.callee = {};
        break;
        case 'MemberExpression':
            queryRef = out;
        break;
        case 'Identifier':
            queryRef = out;
        break;
        default:
            throw new Exception('Invalid type given.');
    }

    let count = 1;

    // console.log('exprParts', exprParts);

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
    }, queryRef);

    // console.log(JSON.stringify(out));

    return out;
}

export function createObjectPropertyGetter(objectExprStr) {

}
