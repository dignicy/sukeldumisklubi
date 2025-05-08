import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import Pocketbase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';



export const handle: Handle = async ({ event, resolve }) => {
	event.locals.pb = new Pocketbase(PUBLIC_POCKETBASE_URL);
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');


	try {
		if (event.locals.pb.authStore.isValid) {
			const user = await event.locals.pb.collection('users').authRefresh();
			event.locals.user = structuredClone(user.record);
		} else {
			event.locals.user = undefined;
		}
	} catch (e) {
		event.locals.user = undefined;
		console.log(e)
	}

	const response = await resolve(event);


	response.headers.set(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({
			secure: event.url.protocol === 'https:',
			httpOnly: false,
			sameSite: 'lax', // Use "lax" to allow OAuth redirects, or "none" if strictly cross-site (with secure)
			
		})
	);

	return response;
}