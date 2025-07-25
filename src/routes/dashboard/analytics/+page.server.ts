import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    // Check if user is authenticated
    if (!locals.user) {
        redirect(303, '/login?redirect=/dashboard/analytics');
    }

    // For now, allow any authenticated user to access analytics
    // In production, you might want to add proper role-based access control
    return {
        user: locals.user
    };
}; 