'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeSdl = require('node-sdl2');

var _nodeSdl2 = _interopRequireDefault(_nodeSdl);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const App = _nodeSdl2.default.app;
const Window = _nodeSdl2.default.window;

class Win {
  constructor() {
    this.win = null;
    this.keypress = [];
  }

  init() {
    this.win = new Window({
      w: 800,
      h: 600,
      resizable: false
    });
    this.win.on('close', () => {
      App.quit();
    });

    this.win.on('keydown', key => {
      if (!key.repeat) {
        this.handleKeyDown(key.keyname);
      }
    });

    this.win.on('keyup', key => {
      this.handleKeyUp(key.keyname);
    });
  }

  handleKeyDown(keyname) {
    const code = (0, _keycode2.default)(keyname);
    if (typeof code === 'number' && this.keypress.indexOf(code) === -1) {
      this.keypress.push(code);
    }
  }

  handleKeyUp(keyname) {
    const code = (0, _keycode2.default)(keyname);
    if (typeof code === 'number') {
      const index = this.keypress.indexOf(code);
      if (index !== -1) {
        this.keypress.splice(index, 1);
      }
    }
  }

  getKeyPress() {
    return this.keypress;
  }
}
exports.default = Win;
//# sourceMappingURL=win.js.map