import { redirect, error } from '@sveltejs/kit';
import { pbAsAdmin } from '$lib/server/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    // Check if user is authenticated
    if (!locals.user) {
        redirect(303, '/login?redirect=/dashboard');
    }

    // For now, allow any authenticated user to access dashboard
    // In production, you might want to add proper role-based access control
    try {
        const adminPb = await pbAsAdmin();
        
        // Get comprehensive stats for the dashboard with better error handling
        // Split registrations into a separate request to avoid auto-cancellation
        const results = await Promise.allSettled([
            adminPb.collection('users').getList(1, 1, { filter: 'verified = true' }),
            adminPb.collection('events').getList(1, 1),
            adminPb.collection('clients').getList(1, 1),
        ]);

        // Get ALL registrations in one request to avoid auto-cancellation
        const registrationsResult = await adminPb.collection('event_registrations').getList(1, 1000, {
            sort: '-created'
        }).catch((error) => {
            console.error('Dashboard: Failed to load registrations:', error);
            return { items: [] };
        });

        // Process results with detailed logging
        const stats = {
            totalUsers: 0,
            totalEvents: 0,
            totalClients: 0,
            totalRegistrations: 0,
            pendingRegistrations: 0,
        };

        // Users
        if (results[0].status === 'fulfilled') {
            stats.totalUsers = results[0].value.totalItems;
        } else {
            console.error('Dashboard: Failed to load users:', results[0].reason);
        }

        // Events
        if (results[1].status === 'fulfilled') {
            stats.totalEvents = results[1].value.totalItems;
        } else {
            console.error('Dashboard: Failed to load events:', results[1].reason);
        }

        // Clients
        if (results[2].status === 'fulfilled') {
            stats.totalClients = results[2].value.totalItems;
        } else {
            console.error('Dashboard: Failed to load clients:', results[2].reason);
        }

        // Compute registration stats from the single request
        stats.totalRegistrations = registrationsResult.items.length;
        stats.pendingRegistrations = registrationsResult.items.filter((r: any) => r.status === 'waiting_confirmation').length;

        return {
            user: locals.user,
            stats
        };
    } catch (e) {
        console.error('Error loading dashboard stats:', e);
        // If we can't get admin stats, return basic user info
        return {
            user: locals.user,
            stats: {
                totalUsers: 0,
                totalEvents: 0,
                totalClients: 0,
                totalRegistrations: 0,
                pendingRegistrations: 0,
            }
        };
    }
}; 