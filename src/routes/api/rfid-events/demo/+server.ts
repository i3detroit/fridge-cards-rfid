import { json } from '@sveltejs/kit';
import { emitDemoTag } from '$lib/serial';

export const GET = () => { emitDemoTag(); return json({}); }