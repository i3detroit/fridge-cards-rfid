import { SerialPort, SerialPortMock } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import { dev } from '$app/environment';
import { init } from 'raspi'
import { DigitalOutput, LOW, HIGH } from 'raspi-gpio'

if (dev) {
    SerialPortMock.binding.createPort('/dev/ttyAMA0', {
        echo: true, recording: true
    });
}

const serial = new (dev ? SerialPortMock : SerialPort)({
    path: '/dev/ttyAMA0', baudRate: 2400
});

const buzzer_output = new DigitalOutput('GPIO5');
buzzer_output.write(LOW);

serial.on('data', data => console.log('Serial data:', data.toString().trim()));

export const serialParser = serial.pipe(new ReadlineParser({
    delimiter: '\r'
}));

export const beepBuzzer = () => {
        buzzer_output.write(HIGH);
        setTimeout(() => {
            buzzer_output.write(LOW);
        }, 200);
};

export const emitDemoTag = () => serial.port.emitData('11111111\r\n');