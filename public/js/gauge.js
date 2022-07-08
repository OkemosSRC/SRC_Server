var opts = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: false,     // If false, max value increases automatically if value > maxValue
    limitMin: false,     // If true, the min value of the gauge will be fixed
    colorStart: '#ffffff',   // Colors
    colorStop: '#ffffff',    // just experiment with them
    strokeColor: '#ffffff',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticLabels: {
        font: "30px sans-serif",  // Specifies font
        labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    percentColors: [
        [0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]
    ],
    renderTicks: {
        divisions: 10,
        divWidth: 1,
        divLength: 0.5,
        divColor: "#333333",
        subDivisions: 5,
        subWidth: 1,
        subLength: 0.5,
        subColor: "#666666"

    }

};
var target = document.getElementById('speed'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 100; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 5; // set animation speed (32 is default value)
setInterval(function () {
    // get random value between 0 and 70
    var value = Math.floor(Math.random() * 100);
    gauge.set(value); // set actual value
    document.getElementById("speed_val").innerHTML = value+" MPH";
}, 500);
gauge.set(60); // set actual value
