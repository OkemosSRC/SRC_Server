let socket = io()

// connection with server
socket.on('connect', function () {
    console.log('connected to server')
});

// when disconnected from server
socket.on('disconnect', function () {
    console.log('Disconnected from Server')
});


socket.on('speed_data', function (data) {
    if (data.op === 6) {
        // console.log(data.d.speed)
        let value = data.d.speed
        gauge.set(value); // set actual value
        document.getElementById("speed_val").innerHTML = value + " MPH";
        let unix_timestamp = data.d.time;
        let date = new Date(unix_timestamp);
        let hours = "0" + date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        document.getElementById("spd_time").innerHTML = hours.substring(hours.length - 2) + ":" + minutes.substring(minutes.length - 2) + ":" + seconds.substring(seconds.length - 2) + " ETC";

    }
})

setInterval(function () {
    // update the clock every second
    let now = new Date();
    let hours = "0" + now.getHours();
    let minutes = "0" + now.getMinutes();
    let seconds = "0" + now.getSeconds();
    document.getElementById("current_time").innerHTML = hours.substring(hours.length - 2) + ":" + minutes.substring(minutes.length - 2) + ":" + seconds.substring(seconds.length - 2) + " ETC";
}, 1000);


setInterval(function () {
    socket.emit('speed_data', {
        op: 5
    })
}, 5000)


socket.on('battery_data', function (data) {
    if (data.op === 6) {
        let voltage_data = data.d.voltage;
        document.getElementById("battery_voltage").innerHTML = voltage_data + " V";

        let temp_data = data.d.temp;
        document.getElementById("battery_temp").innerHTML = temp_data + " °F";
    }
})

setInterval(function () {
    socket.emit('battery_data', {
        op: 5
    })
}, 5000)


