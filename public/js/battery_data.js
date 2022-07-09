let socket = io()

// connection with server
socket.on('connect', function () {
    console.log('connected to server')
});

// when disconnected from server
socket.on('disconnect', function () {
    console.log('Disconnected from Server')
});


socket.on('battery_data', function (data) {
    if (data.op === 6) {
        // console.log(data.d.speed)
        let voltage_data = data.d.voltage;
        voltage_gauge.set(voltage_data); // set actual value
        document.getElementById("voltage_val").innerHTML = voltage_data + " V";

        let temp_data = data.d.temp;
        temp_gauge.set(temp_data); // set actual value
        document.getElementById("temp_val").innerHTML = temp_data + " °F";

        let unix_timestamp = data.d.time;
        let date = new Date(unix_timestamp);
        let years = date.getFullYear();
        let months = "0" + date.getMonth();
        let days = "0" + date.getDate();
        let hours = "0" + date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        document.getElementById("bat_time").innerHTML = months.substring(months.length - 2) + "/" + days.substring(days.length - 2) + "/" + years + " - " + hours.substring(hours.length - 2) + ":" + minutes.substring(minutes.length - 2) + ":" + seconds.substring(seconds.length - 2) + " ETC";
    }
})

function bat_data() {
    socket.emit('battery_data', {
        op: 5
    })
}

bat_data();

setInterval(bat_data, 5000)

setInterval(function () {
    let now = new Date();
    let years = now.getFullYear();
    let months = "0" + now.getMonth();
    let days = "0" + now.getDate();
    let hours = "0" + now.getHours();
    let minutes = "0" + now.getMinutes();
    let seconds = "0" + now.getSeconds();
    document.getElementById("time").innerHTML = months.substring(months.length - 2) + "/" + days.substring(days.length - 2) + "/" + years + " - " + hours.substring(hours.length - 2) + ":" + minutes.substring(minutes.length - 2) + ":" + seconds.substring(seconds.length - 2) + " ETC";
}, 1000);

