import { dispatch as d3dispatch } from 'd3-dispatch';

export default class Sample {
    createEndDispatcher () {
        return d3dispatch('animationEnd');
    }
}
