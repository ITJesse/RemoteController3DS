'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BIT = n => 1 << n;

const keycode3DS = {
  A: BIT(0),
  B: BIT(1),
  Select: BIT(2),
  Start: BIT(3),
  Right: BIT(4),
  Left: BIT(5),
  Up: BIT(6),
  Down: BIT(7),
  R: BIT(8),
  L: BIT(9),
  X: BIT(10),
  Y: BIT(11),
  ZL: BIT(14),
  ZR: BIT(15)
};

class Keymap {
  constructor() {
    const keys = Object.keys(_config2.default.keymap);
    this.keymap = {};
    for (const e of keys) {
      const code = (0, _keycode2.default)(_config2.default.keymap[e]);
      this.keymap[code] = e;
    }
  }

  get3DSKey(code) {
    const key = this.getKey(code);
    return keycode3DS[key] || 0;
  }

  getKey(code) {
    return this.keymap[code] || null;
  }

  getKeymap() {
    return this.keymap;
  }
}
exports.default = Keymap;
//# sourceMappingURL=keymap.js.map