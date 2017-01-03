export * from './calls';

// export function createTransform(convert) {
//     return function transformer(file, api) {
//         const j = api.jscodeshift,
//               root = j(file.source);

//         nsCall(j, root, convert);

//         return root.toSource({
//             quote: 'single',
//             reuseWhitespace: false
//         });
//     };
// };
