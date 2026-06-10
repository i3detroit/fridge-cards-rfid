import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '../../../../prisma/index';

export const actions = {
    default: async ({ request, url }) => {
        const data = await request.formData();
        const type = url.searchParams.get('type') ?? data.get('type');
        const id = data.get('id');
        const amount = parseFloat(parseFloat(data.get('amount')).toFixed(2));

        const user = await prisma.users.findUnique({
            select: { balance: true },
            where: { id }
        });

        if (!id || !amount || isNaN(amount) || !user) {
            return fail(400, { failure: true });
        }

        const newBalance = type == 'deposit' ?
            user.balance + amount : user.balance - amount;
        if (newBalance < 0) {
            return fail(400, { failure: true });
        }

        await prisma.users.update({
            where: { id },
            data: { balance: newBalance }
        });

        const urlParams = new URLSearchParams({ type, amount, balance: newBalance });
        return redirect(303, `/flow/confirmation?${urlParams}`);
    }
} satisfies Actions;