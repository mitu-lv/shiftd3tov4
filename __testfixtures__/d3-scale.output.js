import Chart from './chart';
import { scaleLinear, scaleOrdinal } from 'd3-scale';

export default class Sample {
    helperNumeric(range) {
        return scaleLinear().domain([0, 1]).range(range);
    }

    createOrdinal(range) {
        var max = d3.max(range);
        return scaleOrdinal().domain([0, 1]).range(range);
    }
}
