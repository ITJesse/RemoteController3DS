import keycode from 'keycode';

import config from './config';

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
  ZR: BIT(15),
};

export default class Keymap {
  constructor() {
    const keys = Object.keys(config.keymap);
    this.keymap = {};
    for (const e of keys) {
      const code = keycode(config.keymap[e]);
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
