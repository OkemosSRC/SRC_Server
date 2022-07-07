let socket = io()

// connection with server
socket.on('connect', function () {
    console.log('connected to server')
});

// when disconnected from server
socket.on('disconnect', function () {
    console.log('Disconnected from Server')
});

function onclick() {
    // get the value of the input fields
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    // initialize all the values to empty
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

    // send the message to the server
    socket.emit('createMessage', {
        name: name,
        email: email,
        message: message
    })
    return false;
}
