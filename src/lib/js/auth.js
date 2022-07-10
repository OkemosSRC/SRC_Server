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
        });
        // insert data into the database
        db.serialize(() => {
            db.run(`INSERT INTO auth (token, time)
                    VALUES (?, ?)`, [hash_func(token), new Date()]);
        });
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
// It will check if the token is valid by checking if it's in the database
function validate_token(token, callback) {
    let db = new sqlite3.Database('db/auth.db');
    // console.log("validating token");
    db.serialize(() => {
        db.get(`SELECT *
                FROM auth
                WHERE token = ?`, [hash_func(token)], (err, row) => {
            if (err) {
                console.log(err);
                callback(err, false);
            }
            if (row) {
                callback(err, true);
            } else {
                callback(err, false);
            }
        });
    });
}


// This function is called to create a token with a given length
function make_token(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// export the functions
module.exports = {
    add_user, validate_token, make_token
}
