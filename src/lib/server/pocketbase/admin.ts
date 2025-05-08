import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { PRIVATE_POCKETBASE_USER, PRIVATE_POCKETBASE_PW } from '$env/static/private';
import Pocketbase from 'pocketbase';

let PCKBS: Pocketbase | undefined = undefined;
let PB_EXPIRES = Date.now();

/**
 * Pocketbase instance authenticated as an admin using `ADMIN_USER` and `ADMIN_PASS` envvars.
 */
export async function pbAsAdmin() {
	if (PCKBS && PB_EXPIRES > Date.now() && PCKBS.authStore.isValid) return PCKBS;

	const pb = new Pocketbase(PUBLIC_POCKETBASE_URL);
	await pb.collection("_superusers").authWithPassword(PRIVATE_POCKETBASE_USER, PRIVATE_POCKETBASE_PW);

	if (pb.authStore.isValid) {
		PCKBS = pb;
		PB_EXPIRES = Date.now() + 3600;
		return pb;
	}

	pb.authStore.clear();
	if (PCKBS) PCKBS.authStore.clear();

	throw new Error('ADMIN_USER/ADMIN_PASS not valid');
}