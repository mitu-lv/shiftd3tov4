import Chart from './chart';

export default class Sample {
    helperNumeric(range) {
        return d3.scale.linear().domain([0, 1]).range(range);
    }

    createOrdinal(range) {
        var max = d3.max(range);
        return d3.scale.ordinal().domain([0, 1]).range(range);
    }
}
