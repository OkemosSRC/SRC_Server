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
        let db = new sqlite3.Database('db/speed.db');
        // add_user('test');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS speed
                    (
                        speed
                            FLOAT,
                        time
                            DATETIME
                    )`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
        // insert data into the database
        db.close();
    } catch (err) {
        console.error(err);
    }
}


function speed(socket) {
    // insert data into the database
    let db = new sqlite3.Database('db/speed.db');
    socket.on('speed_data', (data) => {
        try {
            if (data.op === 1) {
                if (!data.d.auth) {
                    socket.emit('speed_data', {op: 3, t: 'unauthorized'});
                    return;
                }
                // calls validate_token to check if the token is valid
                // if token is valid, then continue
                validate_token(data.d.auth, (err, result) => {
                    if (err) {
                        console.error(err);
                        socket.emit('speed_data', {op: 3, t: 'unauthorized'});
                        return;
                    }
                    if (result) {
                        let speed = data.d.speed;
                        let time = data.d.time;
                        // if data.t is not empty, then print data.t
                        if (data.t) {
                            // console.log(data.t, "Received from client");
                        }
                        db.serialize(() => {
                            db.run(`INSERT INTO speed (speed, time)
                                    VALUES (?, ?)`, [speed, time], (err) => {
                                if (err) {
                                    console.error(err);
                                    socket.emit('speed_data', {
                                        op: 4, d: {
                                            'error': err, 'time': new Date()
                                        }, t: 'failed'
                                    });
                                } else {
                                    socket.emit('speed_data', {op: 3, t: 'success'});
                                    // broadcast the speed to all clients
                                    socket.broadcast.emit('speed_data', {
                                        op: 6, d: {
                                            'speed': speed, 'time': time,
                                        }, t: 'success',
                                    });
                                }
                            });
                        })
                    } else {
                        socket.emit('speed_data', {op: 7, t: 'unauthorized'});
                    }
                })
            } else if (data.op === 5) {
                // send the current speed to the client with op code 6
                db.serialize(() => {
                    db.get(`SELECT *
                            FROM speed
                            ORDER BY time DESC
                            LIMIT 1`, (err, row) => {
                        if (err) {
                            console.error(err);
                        }
                        if (!row) {
                            // console.log("no data");
                            socket.emit('speed_data', {
                                op: 6, d: {
                                    'speed': NaN, 'time': 0
                                }, t: 'success'
                            });
                        } else {
                            socket.emit('speed_data', {
                                op: 6, d: {
                                    'speed': row['speed'], 'time': row['time']
                                }, t: 'success'
                            });
                        }
                    });
                });
            } else if (data.op !== 1 && data.op !== 5) {
                // console.log("invalid operation");
                socket.emit('speed_data', {
                    op: 2, d: {
                        'time': new Date()
                    }, t: 'error'
                });
            }
        } catch (err) {
            console.error(err);
            socket.emit('speed_data', {
                op: 4, d: {
                    'error': err, 'time': new Date()
                }, t: 'failed'
            });
        }
    });
}


module.exports = {
    db_init_speed: db_init, speed_handler: speed
}
