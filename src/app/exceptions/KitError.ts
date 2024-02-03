import { error } from '@sveltejs/kit';
export const KitError = error;
export type KitError = typeof error;
