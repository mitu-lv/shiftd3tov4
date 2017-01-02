import Chart from './chart';
import {ensureZero, ensureZeroEqual} from '../tools/domain';

export default class BarClass extends Chart {
    getDomain (graphs) {
        var domain = [
            d3.min(graphs, function (graph) {
                return d3.min(graph.data, function (item) {
                    return item.x;
                });
            }),
            d3.max(graphs, function (graph) {
                return d3.max(graph.data, function (item) {
                    return item.x;
                });
            })
        ];

        ensureZeroEqual(domain);

        ensureZero(domain);

        return domain;
    }
}

