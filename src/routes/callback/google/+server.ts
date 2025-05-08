import { PUBLIC_ORIGIN } from "$env/static/public";
import { redirect, type RequestHandler } from "@sveltejs/kit";


export const GET: RequestHandler = async ({ url, locals, cookies }) => {
    // Read the cookie that was set previously from our more universal path
    const token = url.searchParams.get('token');
    try {
        locals.pb.authStore.save(token)
        const user = await locals.pb.collection('users').authRefresh();
        locals.user = structuredClone(user.record);
 
        return redirect(303, '/dashboard');
    } catch (e) {
        console.error(e);
        return redirect(303, '/login?fail=true');
    }
}