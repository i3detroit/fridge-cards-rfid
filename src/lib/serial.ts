import { SerialPort, SerialPortMock } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { dev } from '$app/environment';

if (dev) {
    SerialPortMock.binding.createPort('/dev/ttyAMA0', {
        echo: true, recording: true
    });
}

const serial = new (dev ? SerialPortMock : SerialPort)({
    path: '/dev/ttyAMA0', baudRate: 2400
});

if (dev) {
    serial.on('open', () => {
        setTimeout(() => {
            serial.port.emitData('11111111\r\n');
        }, 5000);
    });
}

export const serialParser = serial.pipe(new ReadlineParser({
    delimiter: '\r\n'
}));