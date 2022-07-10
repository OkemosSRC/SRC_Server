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


const util = require('util');
const exec = util.promisify(require('child_process').exec);


async function battery_graph() {
    const {stdout, stderr} = await exec('python3 src/lib/py/battery_graph.py');
    if (stdout) {
        console.log(stdout);
    }
    if (stderr) {
        console.log(stderr);
    }
}


module.exports = {
    battery_graph: battery_graph
}
