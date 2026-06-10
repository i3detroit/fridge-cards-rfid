import { produce } from 'sveltekit-sse';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

const serial = new SerialPort({ path: '/dev/ttyAMA0', baudRate: 2400 });
const serialParser = serial.pipe(new ReadlineParser({ delimiter: '\r\n' }));

export const POST = () => {
    let lastID = false;

    return produce(async ({ emit }) => {
        serialParser.on('data', (newID: any) => {
            // Don't emit multiple events if a tag is held for awhile
            if (newID == lastID) { return; }
            
            lastID = newID;
            emit('message', newID);
        });
    });
};