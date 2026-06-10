import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '../../../../prisma/index';

export const actions = {
    default: async ({ request, url }) => {
        const data = await request.formData();
        const type = url.searchParams.get('type') ?? data.get('type');
        const id = data.get('id');
        const amount = parseFloat(parseFloat(data.get('amount')).toFixed(2));

        const userInitial = await prisma.users.findUnique({
            select: { balance: true },
            where: { id }
        });

        if (!id || !amount || isNaN(amount) || !userInitial) {
            return fail(400, { failure: true });
        }

        const newBalance = type == 'deposit' ?
            userInitial.balance + amount : userInitial.balance - amount;
        if (newBalance < 0) {
            return fail(400, { failure: true, message: 'Insufficient funds to withdraw from.' });
        }

        const user = await prisma.users.update({
            where: { id },
            data: { balance: newBalance }
        });

        return { failure: false, user, transaction: { type, amount } };
    }
} satisfies Actions;