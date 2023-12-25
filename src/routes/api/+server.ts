import { json, redirect } from '@sveltejs/kit';

export async function GET({ url, locals }) {
	return json({
		success: true
	});
}
