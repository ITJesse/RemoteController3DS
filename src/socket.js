import dgram from 'dgram';

import config from './config';

const HOST = config.IP;
const PORT = 4950;
const touch = 0x2000000;
const cpad = 0x800800;

export default class Socket {
  constructor() {
    this.client = dgram.createSocket('udp4');
  }

  static buildSocketData(buttons) {
    const data = [];

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
    console.log(data);

    return new Buffer(data);
  }

  send(buttons) {
    this.client.send(Socket.buildSocketData(buttons), PORT, HOST, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}
