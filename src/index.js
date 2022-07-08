const express = require('express'); // using express
const socketIO = require('socket.io');
const http = require('http')
const port = process.env.PORT || 8080 // setting the port
let app = express();
let {battery_graph} = require('./lib/graphs');
let {battery, db_init} = require('./lib/battery');
let server = http.createServer(app);
app.use(express.static('public')) // using the public folder
let io = socketIO(server, {serveClient: false}); // using socket.io

setInterval(battery_graph,30000); // calling the battery_graph function every 30000 milliseconds (30 seconds)

db_init();
// make a connection with the user from server side
io.on('connection', (socket) => {
    console.log('a user connected');
    battery(socket);
    socket.on('disconnect', () => {
        console.log('disconnected from user');
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/html/index.html')
    console.log("request received")
})

app.get('/battery', (req, res) => {
    res.sendFile(__dirname + '/assets/html/battery.html')
    console.log("request received")
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



