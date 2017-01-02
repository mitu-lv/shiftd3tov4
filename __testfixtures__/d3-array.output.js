import Chart from './chart';
import {ensureZero, ensureZeroEqual} from '../tools/domain';
import { min, max, sum, range } from 'd3-array';

export default class BarClass extends Chart {
    getDomain (graphs) {
        var domain = [
            min(graphs, function (graph) {
                return min(graph.data, function (item) {
                    return item.x;
                });
            }),
            max(graphs, function (graph) {
                return max(graph.data, function (item) {
                    return item.x;
                });
            })
        ];

        ensureZeroEqual(domain);

        ensureZero(domain);

        return domain;
    }

    sumSomething (something) {
        // comment
        return sum(something);
    }

    createNumberArray (len) {
        return range(0, len);
    }
}
