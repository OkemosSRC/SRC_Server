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


let socket = io()


// connection with server
socket.on('connect', function () {
    console.log('connected to server')
});


// when disconnected from server
socket.on('disconnect', function () {
    console.log('Disconnected from Server')
});


socket.on('battery_data', function (data) {
    if (data.op === 6) {
        // console.log(data.d.speed)
        let voltage_data = data.d.voltage;
        voltage_gauge.set(voltage_data); // set actual value
        document.getElementById("voltage_val").innerHTML = voltage_data + " V";

        let temp_data = data.d.temp;
        temp_gauge.set(temp_data); // set actual value
        document.getElementById("temp_val").innerHTML = temp_data + " °F";
        let unix_timestamp = data.d.time;
        let date = new Date(unix_timestamp);
        let years = date.getFullYear();
        let months = "0" + date.getMonth();
        let days = "0" + date.getDate();
        let hours = "0" + date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        document.getElementById("bat_time").innerHTML = months.substring(months.length - 2) + "/" + days.substring(days.length - 2) + "/" + years + " - " + hours.substring(hours.length - 2) + ":" + minutes.substring(minutes.length - 2) + ":" + seconds.substring(seconds.length - 2) + " ETC";
    }
})


async function bat_data() {
    socket.emit('battery_data', {
        op: 5
    })
}


async function current_time() {
    let now = new Date();
    let years = now.getFullYear();
    let months = "0" + now.getMonth();
    let days = "0" + now.getDate();
    let hours = "0" + now.getHours();
    let minutes = "0" + now.getMinutes();
    let seconds = "0" + now.getSeconds();
    document.getElementById("time").innerHTML = months.substring(months.length - 2) + "/" + days.substring(days.length - 2) + "/" + years + " - " + hours.substring(hours.length - 2) + ":" + minutes.substring(minutes.length - 2) + ":" + seconds.substring(seconds.length - 2) + " ETC";
}


current_time();
bat_data();


setInterval(current_time, 1000);
