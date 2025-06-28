import { redirect, error } from '@sveltejs/kit';
import { pbAsAdmin } from '$lib/server/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
    // Check if user is authenticated
    if (!locals.user) {
        redirect(303, '/login?redirect=/dashboard/clients');
    }

    try {
        const adminPb = await pbAsAdmin();
        
        // Get search parameter
        const search = url.searchParams.get('search') ?? '';
        
        // Build filter for search
        let filter = '';
        if (search) {
            filter = `(first_name ~ "${search}" || last_name ~ "${search}" || email ~ "${search}" || phone ~ "${search}")`;
        }

        // Fetch ALL clients (increased perPage to 500 to get all clients)
        const clients = await adminPb.collection('clients').getList(1, 500, {
            filter,
            sort: '-created'
        });

        // Get ALL registrations in one request to avoid auto-cancellation
        const allRegistrations = await adminPb.collection('event_registrations').getList(1, 1000, {
            sort: '-created'
        }).catch(() => ({ items: [] })); // Fallback to empty if registrations collection doesn't exist

        // Compute registration counts for each client
        const registrationCounts = new Map<string, number>();
        allRegistrations.items.forEach((registration: any) => {
            const clientId = registration.client;
            registrationCounts.set(clientId, (registrationCounts.get(clientId) || 0) + 1);
        });

        // Add registration counts to clients
        const clientsWithStats = clients.items.map((client) => ({
            ...client,
            registrationCount: registrationCounts.get(client.id) || 0
        }));

        return {
            user: locals.user,
            clients: {
                ...clients,
                items: clientsWithStats
            }
        };
    } catch (e) {
        console.error('Error loading clients:', e);
        // Return empty data if admin access fails
        return {
            user: locals.user,
            clients: {
                items: [],
                page: 1,
                perPage: 500,
                totalItems: 0,
                totalPages: 0
            }
        };
    }
}; 