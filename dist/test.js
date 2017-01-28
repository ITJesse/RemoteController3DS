'use strict';

var _net = require('net');

const sock = (0, _net.connect)(8000, '192.168.2.218', () => {});

console.log(sock);
//# sourceMappingURL=test.js.map