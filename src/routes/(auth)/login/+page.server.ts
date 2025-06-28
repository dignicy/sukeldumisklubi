import { redirect } from '@sveltejs/kit';
import type { LoginBody } from '../auth';

export const actions = {
	async login({ locals, request, url }) {
		const bodyRaw = Object.fromEntries(await request.formData()) as unknown;
		const body = bodyRaw as LoginBody;

		const getRefered = request.headers.get('referer');
		const checkIfUrlHasRedirect = new URL(getRefered || '').searchParams.get('redirect');

		try {
			const user = await locals.pb.collection('users').authWithPassword(body.email, body.password);
			if (!user.record.verified) {
				locals.pb.authStore.clear();
				return { errorMessage: 'Please verify your email by clicking the link in the email we sent you' };
			}
			locals.user = structuredClone(user.record);

		} catch (e: unknown) {
			console.error('Error:', e);
			const catachable = e as Error;
			return { errorMessage: catachable.message };
		}

		redirect(303, checkIfUrlHasRedirect || '/dashboard');
	},

	async google({ locals, cookies, request, url }) {
		const token = url.searchParams.get('token');
		locals.pb.authStore.save(token)
		locals.user = await locals.pb.collection('users').authRefresh();
		return redirect(303, url.searchParams.get('redirect') || '/dashboard');
	}
};

export function load({ locals, url }) {
	if (locals.user) {
		const redirectTo = url.searchParams.get('redirect');
		redirect(303, redirectTo || '/dashboard');
	}
}
