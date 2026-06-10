import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '../../../../prisma/index';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name').trim();

        if (!id || !name) {
            return fail(400, { failure: true });
        }

        const user = await prisma.users.create({
            data: { id, name }
        });
        
        return { failure: false, user };
    }
} satisfies Actions;