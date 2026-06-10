import { produce } from 'sveltekit-sse';
import { serialParser } from '$lib/serial';
import { prisma } from '../../../../prisma/index';

export const POST = () => {
    let lastID: string;

    return produce(async ({ emit }) => {
        serialParser.on('data', async (newID: string) => {
            // Don't emit multiple events if a tag is held for awhile
            if (newID == lastID) { return; }
            lastID = newID;
            
            const payload = await prisma.users.findUnique({
                select: { id: true, name: true, balance: true },
                where: { id: newID }
            }) ?? { id: newID };
            emit('data', JSON.stringify(payload));
        });
    });
};