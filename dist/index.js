'use strict';

var _win = require('./win');

var _win2 = _interopRequireDefault(_win);

var _keymap = require('./keymap');

var _keymap2 = _interopRequireDefault(_keymap);

var _socket = require('./socket');

var _socket2 = _interopRequireDefault(_socket);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let oldbuttons = 0x00;
const keymap = new _keymap2.default();
const socket = new _socket2.default();

const win = new _win2.default();
let count = 0;
win.init();

setInterval(() => {
  const keypress = win.getKeyPress();
  let newbuttons = 0xfff;
  for (const code of keypress) {
    newbuttons -= keymap.get3DSKey(code);
  }
  if (_config2.default.type === 'ntr') {
    if (oldbuttons !== newbuttons) {
      socket.send(newbuttons);
      oldbuttons = newbuttons;
      count = 0;
    } else if (oldbuttons === newbuttons && count < 5) {
      socket.send(newbuttons);
      count++;
    }
  } else {
    socket.send(newbuttons);
  }
}, 5);
//# sourceMappingURL=index.js.map