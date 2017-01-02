import Chart from './chart';
import { interpolate } from 'd3-interpolate';

export default class Sample {
    tweenSomething(range) {
        return function(a, i) {
            var d = b.call(this, a, i);
            i = interpolate(a, d);

            for (var k in d) {
                a[k] = d[k]; // update data
            }

            return function(t) {
                return renderSomething(i(t));
            };
        };
    }
}
