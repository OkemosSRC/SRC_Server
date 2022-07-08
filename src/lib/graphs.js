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
