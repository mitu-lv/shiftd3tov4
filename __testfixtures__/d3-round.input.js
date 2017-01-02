import Chart from './chart';
import {ensureZero, ensureZeroEqual} from '../tools/domain';

export default class Chart {
    getDomain (graphs) {
        var domain = [
            d3.min(graphs, function (graph) {
                return d3.min(graph.data, function (item) {
                    return d3.round(item.x, 2);
                });
            }),
            d3.max(graphs, function (graph) {
                return d3.max(graph.data, function (item) {
                    return d3.round(item.x, 3);
                });
            })
        ];

        ensureZeroEqual(domain);

        ensureZero(domain);

        return domain;
    }
}
