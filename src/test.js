import {
  connect,
} from 'net';

const sock = connect(8000, '192.168.2.218', () => {

});

console.log(sock);
