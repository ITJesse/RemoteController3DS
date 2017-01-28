import Win from './win';
import Keymap from './keymap';
import Socket from './socket';

let oldbuttons = 0x00;
const keymap = new Keymap();
const socket = new Socket();

const win = new Win();
win.init();

setInterval(() => {
  const keypress = win.getKeyPress();
  let newbuttons = 0xfff;
  for (const code of keypress) {
    newbuttons += keymap.get3DSKey(code);
  }
  if (oldbuttons !== newbuttons) {
    console.log(newbuttons);
    socket.send(newbuttons);
    oldbuttons = newbuttons;
  }
}, 10);
