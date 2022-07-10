/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @author MatchaOnMuffins
 * @version 1.0
 * @date July 2022
 * @license GNU GPLv3
 * @organization OkemosSRC
 * @copyright 2020 MatchaOnMuffins
 **/


const express = require('express'); // using express
const socketIO = require('socket.io');
const {add_user, make_token} = require('./lib/js/auth')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const chalk = require('chalk');
const fs = require('fs')
const http = require('http')
const port = process.env.PORT || 8080 // setting the port
const {battery_graph} = require('./lib/js/graphs');
const {battery_handler, db_init_battery} = require('./lib/js/battery');
const {speed_handler, db_init_speed} = require('./lib/js/speed');
const NODE_ENV = process.env.NODE_ENV;


// Initializing express
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // using socket.io
app.use(express.static('public')) // using the public folder
app.use(bodyParser.json())


// Initializing morgan
morgan_opt = {stream: fs.createWriteStream('./logs/access.log', {flags: 'a'})}
app.use(morgan('combined', morgan_opt));


// Initializing the database
db_init_battery();
db_init_speed();


// calling the battery_graph function every 30 seconds
setInterval(battery_graph, 30000);


// make a connection with the user from server side
io.on('connection', (socket) => {
    // console.info('a user connected');
    battery_handler(socket);
    speed_handler(socket);
    socket.on('disconnect', () => {
        // console.info('disconnected from user');
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/assets/html/index.html');
});


app.get('/battery', (req, res) => {
    res.sendFile(__dirname + '/assets/html/battery.html');
});


app.get('/battery/gauge', (req, res) => {
    res.sendFile(__dirname + '/assets/html/battery_gauge.html');
});


app.get('/new_token', (req, res) => {
    // if in development mode, generate a new token
    if (NODE_ENV === 'development') {
        let token = make_token(70);
        add_user(token);
        res.send(token);
    } else {
        res.status(403).send('This feature is not available in production mode');
    }
});


// For security reasons, will only work on localhost or Cloudflare Ardo Tunnel
server.listen(port, "localhost", () => {
    console.log(chalk.bgBlackBright(`Server is running on port ${port}`));
    console.log(`URL: http://localhost:${port}`);
});
