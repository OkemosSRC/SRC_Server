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
                    )`);
        })
        db.close();
    } catch (err) {
        console.log(err);
    }
}

function speed(socket) {
    // insert data into the database
    let db = new sqlite3.Database('db/speed.db');
    socket.on('speed_data', (data) => {
        try {
            if (data.op === 1) {
                if(!data.d.auth){
                    socket.emit('speed_data', {op: 3, t: 'unauthorized'});
                    return;
                }
                // validate the token
                // if token is valid, then continue
                // currently not working
                if (validate_token(data.d.auth)) {
                    let speed = data.d.speed || -1;
                    let time = data.d.time || new Date();
                    // console.log("saved to database");
                    // if data.t is not empty, then print data.t
                    if (data.t) {

                        // console.log(data.t, "Received from client");
                    }
                    db.serialize(() => {
                        db.run(`INSERT INTO speed (speed, time)
                                VALUES (?, ?)`, [speed, time]);
                    })
                    socket.emit('speed_data', {op: 3, t: 'success'});
                } else {
                    socket.emit('speed_data', {op: 2, t: 'unauthorized'});
                }
            } else if (data.op === 5) {
                // send the current speed to the client with op code 6
                db.serialize(() => {
                    db.get(`SELECT *
                            FROM speed
                            ORDER BY time DESC LIMIT 1`, (err, row) => {
                            if (err) {
                                console.log(err);
                            } else {
                                socket.emit('speed_data', {
                                    op: 6,
                                    d: {
                                        'speed': row['speed'],
                                        'time': row['time']
                                    },
                                    t: 'success'
                                });
                            }
                        }
                    );
                })
            } else if (data.op !== 1 && data.op !== 5) {
                console.log("invalid operation");
                socket.emit('speed_data', {
                    op: 2,
                    d: {
                        'time': new Date()
                    },
                    t: 'error'
                });
            }
        } catch (err) {
            console.log(err);
            socket.emit('speed_data',
                {
                    op: 4,
                    d: {
                        'error': err,
                        'time': new Date()
                    },
                    t: 'failed'
                }
            );
        }


    })

}


module.exports = {
    db_init_speed: db_init,
    speed_handler: speed
}
