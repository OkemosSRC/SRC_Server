const express = require('express'); // using express
const socketIO = require('socket.io');
const http = require('http')
const port = process.env.PORT || 8080 // setting the port
let app = express();
let server = http.createServer(app);
app.use(express.static('public')) // using the public folder
let io = socketIO(server, {serveClient: false}); // using socket.io

// make a connection with the user from server side
io.on('connection', (socket) => {
    console.log('New user connected');
    //emit message from server to user

    // on createMessage event from user
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // emit message from user to server
    })

    // when server disconnects from user
    socket.on('disconnect', () => {
        console.log('disconnected from user');
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/html/index.html')
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



