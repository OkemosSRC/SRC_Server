var opts_v = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: true,     // If true, the min value of the gauge will be fixed
    colorStart: '#ffffff',   // Colors
    colorStop: '#ffffff',    // just experiment with them
    strokeColor: '#ffffff',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticLabels: {
        font: "30px sans-serif",  // Specifies font
        labels: [0, 5, 10, 15, 20],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    percentColors: [[0.0, "#ff0000"], [0.5, "#f9c802"], [0.6, "#a9d70b"], [0.8, "#f9c802"], [1.0, "#ff0000"]],
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


var opts_t = {
    angle: 0.15, // The span of the gauge arc
    lineWidth: 0.44, // The line thickness
    radiusScale: 1, // Relative radius
    pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
    },
    limitMax: true,     // If false, max value increases automatically if value > maxValue
    limitMin: true,     // If true, the min value of the gauge will be fixed
    colorStart: '#ffffff',   // Colors
    colorStop: '#ffffff',    // just experiment with them
    strokeColor: '#ffffff',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true,     // High resolution support
    staticLabels: {
        font: "30px sans-serif",  // Specifies font
        labels: [0, 20, 40, 60, 80, 100, 120],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
    },
    percentColors: [[0.0, "#ff0000"], [0.52, "#f9c802"], [0.62, "#a9d70b"], [0.72, "#f9c802"], [1.0, "#ff0000"]],
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


var target_v = document.getElementById('battery_voltage'); // your canvas element
var voltage_gauge = new Gauge(target_v).setOptions(opts_v); // create sexy gauge!
voltage_gauge.maxValue = 20; // set max gauge value
voltage_gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
voltage_gauge.animationSpeed = 5; // set animation speed (32 is default value)
voltage_gauge.set(0)


var target_t = document.getElementById('battery_temp'); // your canvas element
var temp_gauge = new Gauge(target_t).setOptions(opts_t); // create sexy gauge!
temp_gauge.maxValue = 120; // set max gauge value
temp_gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
temp_gauge.animationSpeed = 5; // set animation speed (32 is default value)
temp_gauge.set(0)
