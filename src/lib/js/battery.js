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


const sqlite3 = require('sqlite3');
const {validate_token} = require('./auth');


function db_init() {
    try {
        let db = new sqlite3.Database('db/battery.db');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS battery
                    (
                        battery_temp    FLOAT,
                        battery_voltage FLOAT,
                        battery_time    DATETIME
                    )`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        })
        db.close();
    } catch (err) {
        console.error(err);
    }
}


function battery(socket) {
    // insert data into the database
    let db = new sqlite3.Database('db/battery.db');
    socket.on('battery_data', (data) => {
        try {
            if (data.op === 1) {
                if (!data.d.auth) {
                    socket.emit('battery_data', {op: 7, t: 'unauthorized'});
                    return;
                }
                // calls validate_token to check if the token is valid
                validate_token(data.d.auth, (err, result) => {
                    if (err) {
                        console.error(err);
                        socket.emit('battery_data', {op: 7, t: 'unauthorized'});
                        return;
                    }
                    if (result) {
                        let battery_temp = data.d.temp;
                        let battery_voltage = data.d.voltage;
                        let battery_time = data.d.time;
                        if (data.t) {
                            // console.log(data.t, "Received from client");
                        }
                        db.serialize(() => {
                            db.run(`INSERT INTO battery (battery_temp, battery_voltage, battery_time)
                                    VALUES (?, ?, ?)`, [battery_temp, battery_voltage, battery_time], (err) => {
                                if (err) {
                                    console.error(err);
                                    socket.emit('battery_data', {
                                        op: 4, d: {
                                            'error': err, 'time': new Date()
                                        }, t: 'failed'
                                    });
                                } else {
                                    socket.emit('battery_data', {op: 3, t: 'success'});
                                    // broadcast the speed to all clients
                                    socket.broadcast.emit('battery_data', {
                                        op: 6, d: {
                                            'temp': battery_temp, 'voltage': battery_voltage, 'time': battery_time,
                                        }, t: 'success',
                                    });
                                }
                            });
                        });
                    } else {
                        socket.emit('battery_data', {op: 7, t: 'unauthorized'});
                    }
                })
            } else if (data.op === 5) {
                // send the current speed to the client with op code 6
                db.serialize(() => {
                    db.get(`SELECT *
                            FROM battery
                            ORDER BY battery_time DESC
                            LIMIT 1`, (err, row) => {
                        if (err) {
                            console.error(err);
                        }
                        if (!row) {
                            // console.log("no data");
                            socket.emit('speed_data', {
                                op: 6, d: {
                                    'speed': -1, 'time': new Date()
                                }, t: 'success'
                            });
                        } else {
                            socket.emit('battery_data', {
                                op: 6, d: {
                                    'temp': row['battery_temp'],
                                    'voltage': row['battery_voltage'],
                                    'time': row['battery_time'],
                                }, t: 'success'
                            });
                        }
                    });
                });
            } else if (data.op !== 1 && data.op !== 5) {
                // console.error("invalid operation");
                socket.emit('battery_data', {
                    op: 2, d: {
                        'time': new Date()
                    }, t: 'error'
                });
            }
        } catch (err) {
            console.error(err);
            socket.emit('battery_data', {
                op: 4, d: {
                    'error': err, 'time': new Date()
                }, t: 'failed'
            });
        }
    })
}


module.exports = {
    db_init_battery: db_init, battery_handler: battery
}
