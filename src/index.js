import Win from './win';
import Keymap from './keymap';
import Socket from './socket';
import config from './config';

let oldbuttons = 0x00;
const keymap = new Keymap();
const socket = new Socket();

const win = new Win();
let count = 0;
win.init();

setInterval(() => {
  const keypress = win.getKeyPress();
  let newbuttons = 0xfff;
  for (const code of keypress) {
    newbuttons -= keymap.get3DSKey(code);
  }
  if (config.type === 'ntr') {
    if (oldbuttons !== newbuttons) {
      socket.send(newbuttons);
      oldbuttons = newbuttons;
      count = 0;
    } else if (oldbuttons === newbuttons && count < 10) {
      socket.send(newbuttons);
      count++;
    }
  } else {
    socket.send(newbuttons);
  }
}, 5);
