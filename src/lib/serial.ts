import { SerialPort, SerialPortMock } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { dev } from '$app/environment';
//import { init_gpio, set_gpio, GPIO_MODE_OUTPUT } from '@iiot2k/gpiox'
const gpiox = require("@iiot2k/gpiox");

if (dev) {
    SerialPortMock.binding.createPort('/dev/ttyAMA0', {
        echo: true, recording: true
    });
}

const serial = new (dev ? SerialPortMock : SerialPort)({
    path: '/dev/ttyAMA0', baudRate: 2400
});

gpiox.init_gpio(18, gpiox.GPIO_MODE_OUTPUT, false);

serial.on('data', data => console.log('Serial data:', data.toString().trim()));

export const serialParser = serial.pipe(new ReadlineParser({
    delimiter: '\r'
}));

export const beepBuzzer = () => {
        gpiox.set_gpio(18, true);
        setTimeout(() => {
            gpiox.set_gpio(18, false);
        }, 200);
};

export const emitDemoTag = () => serial.port.emitData('11111111\r\n');