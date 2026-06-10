import type { Users } from '@prisma-app/client';

export const userStore = $state({} as Users);
export const clearUserStore = () => {
    Object.keys(userStore).forEach(key => delete userStore[key]);
};
export const setUserStore = (values: typeof userStore) => {
    Object.keys(values).forEach(key => { userStore[key] = values[key] });
};