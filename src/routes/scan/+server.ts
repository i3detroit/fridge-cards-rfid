import { produce } from 'sveltekit-sse';
import { serialParser } from '$lib/serial';

export const POST = () => {
    let lastID: string;

    return produce(async ({ emit }) => {
        serialParser.on('data', async (newID: string) => {
            // Don't emit multiple events if a tag is held for awhile
            if (newID == lastID) { return; }
            
            lastID = newID;
            emit('message', newID);
        });
    });
};