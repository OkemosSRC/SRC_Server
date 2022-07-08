const sqlite3 = require('sqlite3');

function db_init() {
    try {
        let db = new sqlite3.Database('battery.db');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS battery
                    (
                        battery_temp    FLOAT,
                        battery_voltage FLOAT,
                        battery_time    DATETIME
                    )`);
        })
        db.close();
    } catch (err) {
        console.log(err);
    }
}

function battery(socket) {
    // insert data into the database
    let db = new sqlite3.Database('db/battery.db');
    socket.on('battery_data', (data) => {
        try {
            if (data.op === 1) {
                let battery_temp = data.d.temp || -1;
                let battery_voltage = data.d.voltage || -1;
                let battery_time = data.d.time || new Date();
                console.log("saved to database");
                // if data.t is not empty, then print data.t
                if (data.t) {
                    console.log(data.t, "Received from client");
                }
                db.serialize(() => {
                    db.run(`INSERT INTO battery (battery_temp, battery_voltage, battery_time)
                            VALUES (?, ?, ?)`, [battery_temp, battery_voltage, battery_time]);
                })
                socket.emit('battery_data', {op: 3, t: 'success'});
            } else if (data.op !== 1) {
                console.log("invalid operation");
                socket.emit('battery_data', {
                    op: 2,
                    d: {
                        'time': new Date()
                    },
                    t: 'error'
                });
            }
        } catch (err) {
            console.log(err);
            socket.emit('battery_data',
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
    db_init: db_init,
    battery: battery
}
