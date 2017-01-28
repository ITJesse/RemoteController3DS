import dgram from 'dgram';

import NtrClient from './ntrclient';
import config from './config';

const HOST = config.IP;
const PORT_NTR = 8000;
const PORT_UDP = 4950;

const touch = 0x2000000;
const cpad = 0x800800;

export default class Socket {
  constructor() {
    this.connected = false;
    if (config.type === 'ntr') {
      this.ntr = new NtrClient({
        ip: HOST,
        port: PORT_NTR,
        connectedCallback: () => {
          this.connected = true;
          console.log(`Connected to ${HOST}:${PORT_NTR}`);
        },
        disconnectedCallback: () => {
          this.connected = false;
          console.log(`Disconnect from ${HOST}:${PORT_NTR}`);
        },
      });
    } else {
      this.client = dgram.createSocket('udp4');
      this.connected = true;
      console.log(`Start send data to ${HOST}:${PORT_NTR}`);
      this.client.on('error', (err) => {
        console.log(err);
        this.connected = false;
        this.client.close();
      });
    }
  }

  static buildSocketData(buttons) {
    const data = [];
    // console.log(buttons);

    // Buttons
    data[0] = buttons & 0xFF;
    data[1] = (buttons >> 0x08) & 0xFF;
    data[2] = (buttons >> 0x10) & 0xFF;
    data[3] = (buttons >> 0x18) & 0xFF;

    data[4] = touch & 0xFF;
    data[5] = (touch >> 0x08) & 0xFF;
    data[6] = (touch >> 0x10) & 0xFF;
    data[7] = (touch >> 0x18) & 0xFF;

    data[8] = cpad & 0xFF;
    data[9] = (cpad >> 0x08) & 0xFF;
    data[10] = (cpad >> 0x10) & 0xFF;
    data[11] = (cpad >> 0x18) & 0xFF;
    // console.log(data);

    return new Buffer(data);
  }

  send(buttons) {
    if (this.connected && this.ntr) {
      this.ntr.writeMemory(0x10df20, 16, new Buffer(Socket.buildSocketData(buttons)));
    } else if (this.client) {
      this.client.send(Socket.buildSocketData(buttons), PORT_UDP, HOST, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}
