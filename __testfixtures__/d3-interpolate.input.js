import Chart from './chart';

export default class Sample {
    tweenSomething(range) {
        return function(a, i) {
            var d = b.call(this, a, i);
            i = d3.interpolate(a, d);

            for (var k in d) {
                a[k] = d[k]; // update data
            }

            return function(t) {
                return renderSomething(i(t));
            };
        };
    }
}
