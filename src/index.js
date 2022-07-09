const express = require('express'); // using express
const socketIO = require('socket.io');
const {add_user, make_token} = require('./lib/js/auth')
const bodyParser = require('body-parser')
const http = require('http')
const port = process.env.PORT || 8080 // setting the port
let app = express();
let {battery_graph} = require('./lib/js/graphs');
let {battery_handler, db_init_battery} = require('./lib/js/battery');
let {speed_handler, db_init_speed} = require('./lib/js/speed');
let server = http.createServer(app);
app.use(express.static('public')) // using the public folder
app.use(bodyParser.json())
let io = socketIO(server); // using socket.io
db_init_battery();
db_init_speed()

setInterval(battery_graph, 30000); // calling the battery_graph function every 30 seconds

// make a connection with the user from server side
io.on('connection', (socket) => {
    console.log('a user connected');
    battery_handler(socket);
    speed_handler(socket);
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

app.get('/battery/gauge', (req, res) => {
    res.sendFile(__dirname + '/assets/html/battery_gauge.html')
    console.log("request received")
})

app.get('/new_token', (req, res) => {
    let token = make_token(70);
    add_user(token);
    res.send(token);
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
