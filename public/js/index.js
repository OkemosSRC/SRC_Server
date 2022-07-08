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
        console.log(data.d.speed)
        let value = data.d.speed
        gauge.set(value); // set actual value
        document.getElementById("speed_val").innerHTML = value + " MPH";
    }
})

setInterval(function () {
    socket.emit('speed_data', {
        op: 5
    })
}, 100)


