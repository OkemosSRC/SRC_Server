# SRC_Server

A simple Socket Server for OHS SRC

## Installation

This server requires Python 3.6 or higher and matplotlib.

##### MacOS/Linux

```bash
git clone https://github.com/OkemosSRC/SRC_Server.git
cd SRC_Server
# Install dependencies
pip install -r requirements.txt
npm ci
# Start the server
npm start
```

##### Windows

```bash
git clone https://github.com/OkemosSRC/SRC_Server.git
cd SRC_Server
# Install dependencies
python -m pip install -r requirements.txt
npm ci
# Start the server
npm start
```

To set up a Cloudflare Tunnel, please follow the instructions on
the [Cloudflare page](https://www.cloudflare.com/products/tunnel/).

## Socket Events

A complete list of socket events and their payloads can be found in the [CONFIG.md](CONFIG.md) file.

## License

This project is licensed under the GNU General Public License v3.0.

The full license text can be found [here](LICENSE.md).
