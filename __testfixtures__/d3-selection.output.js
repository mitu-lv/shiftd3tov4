import Chart from './chart';
import { select, event } from 'd3-selection';

export default class Sample {
    helperNumeric(that) {
        return select(that).domain([0, 1]).range(range);
    }

    getTooltipPosition() {
        var tooltipPosition = getMousePosition(event);

        return tooltipPosition;
    }
}
