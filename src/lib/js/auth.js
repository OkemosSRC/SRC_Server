// store auth token hash in sqlite db and check if the token is valid
const sqlite3 = require('sqlite3');
const crypto = require('crypto');
const db = new sqlite3.Database('db/auth.db');

function add_user(token) {
    try {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS auth
                    (
                        token TEXT,
                        time  DATETIME
                    )`);
        })
        // insert data into the database
        db.serialize(() => {
            db.run(`INSERT INTO auth (token, time)
                    VALUES (?, ?)`, [hash_func(token), new Date()]);
        })
    } catch (err) {
        console.log(err);
    }
}

// hash the token
function hash_func(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

// check if the token is valid
// This function is called when the client sends a token to the server
// It will check if the token is valid by checking if the token is in the database
// If the token is valid, it will return true
// If the token is invalid, it will return false


function validate_token(token) {
    // check if the token is in the database
    // if it is, return true
    // if it is not, return false
    let valid = NaN;
    let db = new sqlite3.Database('db/auth.db');
    db.serialize(() => {
        db.get(`SELECT *
                FROM auth
                WHERE token = ?`, [hash_func(token)], (err, row) => {
            if (err) {
                console.log(err);
            } else if (row) {
                console.log("token is valid");
                valid = true;
            } else {
                console.log("token is invalid");
                valid = false;
            }
        })
    })
}


// This function is called to create a token
// It will create a token with a given length
// It will return the token

function make_token(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// export the functions
module.exports = {
    add_user,
    validate_token,
    make_token
}
