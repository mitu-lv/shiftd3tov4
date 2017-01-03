import Chart from './chart';

export default class Sample {
    helperNumeric(that) {
        return d3.select(that).domain([0, 1]).range(range);
    }

    getTooltipPosition() {
        var tooltipPosition = getMousePosition(d3.event);

        return tooltipPosition;
    }
}
