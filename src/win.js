import NS from 'node-sdl2';
import keycode from 'keycode';

const App = NS.app;
const Window = NS.window;

export default class Win {
  constructor() {
    this.win = null;
    this.keypress = [];
  }

  init() {
    this.win = new Window({
      w: 800,
      h: 600,
      resizable: false,
    });
    this.win.on('close', () => {
      App.quit();
    });

    this.win.on('keydown', (key) => {
      if (!key.repeat) {
        this.handleKeyDown(key.keyname);
      }
    });

    this.win.on('keyup', (key) => {
      this.handleKeyUp(key.keyname);
    });
  }

  handleKeyDown(keyname) {
    const code = keycode(keyname);
    if (typeof code === 'number' && this.keypress.indexOf(code) === -1) {
      this.keypress.push(code);
    }
  }

  handleKeyUp(keyname) {
    const code = keycode(keyname);
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
