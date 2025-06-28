import { redirect, error } from '@sveltejs/kit';
import { pbAsAdmin } from '$lib/server/pocketbase';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
    // Check if user is authenticated
    if (!locals.user) {
        redirect(303, '/login?redirect=/dashboard/registrations');
    }

    try {
        const adminPb = await pbAsAdmin();
        
        // Get pagination parameters
        const page = parseInt(url.searchParams.get('page') ?? '1');
        const perPage = parseInt(url.searchParams.get('perPage') ?? '20');
        const search = url.searchParams.get('search') ?? '';
        const statusFilter = url.searchParams.get('status') ?? '';
        const selectedEventId = url.searchParams.get('event') ?? '';
        
        // If an event is selected, show registrations for that event
        if (selectedEventId) {
            try {
                let filter = `event = "${selectedEventId}"`;
                if (search) {
                    filter += ` && (client.first_name ~ "${search}" || client.last_name ~ "${search}" || client.email ~ "${search}")`;
                }
                if (statusFilter) {
                    filter += ` && status = "${statusFilter}"`;
                }

                const [registrations, rawEvent] = await Promise.all([
                    adminPb.collection('event_registrations').getList(page, perPage, {
                        filter,
                        expand: 'client,event',
                        sort: '-created'
                    }),
                    adminPb.collection('events').getOne(selectedEventId)
                ]);

                // Transform the event to have consistent date fields like other parts of the app
                const event = {
                    ...rawEvent,
                    startDate: (rawEvent as any).start_time ? new Date((rawEvent as any).start_time).toISOString().split('T')[0] : (rawEvent.startDate || (rawEvent as any).start_date || (rawEvent as any).date),
                    endDate: (rawEvent as any).end_time ? new Date((rawEvent as any).end_time).toISOString().split('T')[0] : (rawEvent.endDate || (rawEvent as any).end_date),
                    startTime: (rawEvent as any).start_time ? new Date((rawEvent as any).start_time).toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Tallinn' }) : (rawEvent.startTime || (rawEvent as any).time),
                    endTime: (rawEvent as any).end_time ? new Date((rawEvent as any).end_time).toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Tallinn' }) : ((rawEvent as any).endTime),
                    pageSlug: (rawEvent as any).page_slug || rawEvent.pageSlug || (rawEvent as any).slug
                };



                return {
                    user: locals.user,
                    mode: 'event_details',
                    selectedEvent: event,
                    registrations,
                    stats: {
                        waitingConfirmation: 0,
                        paid: 0,
                        totalRegistrations: registrations.totalItems,
                        totalClients: 0
                    }
                };
            } catch (e) {
                console.error('Error loading event details:', e);
                // Fall back to events overview if there's an error
            }
        }

        // Default view: show events with registration counts
        let eventsFilter = '';
        let filteredEventIds: string[] = [];
        
        // If searching, first find events that have registrations matching the search term
        if (search) {
            // Search in registrations by client info
            const matchingRegistrations = await adminPb.collection('event_registrations').getList(1, 500, {
                filter: `client.first_name ~ "${search}" || client.last_name ~ "${search}" || client.email ~ "${search}"`,
                expand: 'client,event',
                sort: '-created'
            });
            
            // Get unique event IDs from matching registrations
            filteredEventIds = [...new Set(matchingRegistrations.items.map(r => r.event))];
            
            // Also search for events by title
            if (filteredEventIds.length === 0) {
                eventsFilter = `title ~ "${search}"`;
            } else {
                // Filter events to only show those with matching registrations
                eventsFilter = filteredEventIds.map(id => `id = "${id}"`).join(' || ');
            }
        }

        // First, let's check if we have any registrations at all
        const allRegistrations = await adminPb.collection('event_registrations').getList(1, 5, {
            expand: 'client,event',
            sort: '-created'
        });

        // Try to fetch events
        let events;
        try {
            events = await adminPb.collection('events').getList(1, 100, {
                filter: eventsFilter,
                sort: '-created'
            });
        } catch (eventError) {
            console.error('Error loading events collection:', eventError);
            
            // If events collection doesn't exist, let's try to get unique events from registrations
            const uniqueEventIds = [...new Set(allRegistrations.items.map(r => r.event))];
            
            // Create mock events from registration data
            events = {
                items: uniqueEventIds.map(eventId => {
                    const registrationsForEvent = allRegistrations.items.filter(r => r.event === eventId);
                    const eventTitle = registrationsForEvent[0]?.expand?.event?.title || `Event ${eventId}`;
                    
                    return {
                        id: eventId,
                        title: eventTitle,
                        location: registrationsForEvent[0]?.expand?.event?.location || 'Unknown location',
                        startDate: registrationsForEvent[0]?.expand?.event?.startDate || new Date().toISOString(),
                        created: registrationsForEvent[0]?.expand?.event?.created || new Date().toISOString()
                    };
                }),
                totalItems: uniqueEventIds.length
            };
        }

        // Get all registrations and compute stats in memory to avoid concurrent request issues
        const allRegistrationsForStats = await adminPb.collection('event_registrations').getList(1, 500, {
            expand: 'client,event',
            sort: '-created'
        });

        // Compute stats for each event from the loaded data
        const eventsWithStats = events.items.map((event) => {
            const eventRegistrations = allRegistrationsForStats.items.filter(r => r.event === event.id);
            const waitingCount = eventRegistrations.filter(r => r.status === 'waiting_confirmation').length;
            const paidCount = eventRegistrations.filter(r => r.status === 'paid').length;
            const totalCount = eventRegistrations.length;

            return {
                ...event,
                registrationStats: {
                    total: totalCount,
                    waiting: waitingCount,
                    paid: paidCount
                }
            };
        });

        // Compute overall stats from the loaded registration data to avoid more concurrent requests
        const waitingTotal = allRegistrationsForStats.items.filter(r => r.status === 'waiting_confirmation').length;
        const paidTotal = allRegistrationsForStats.items.filter(r => r.status === 'paid').length;
        const totalRegistrations = allRegistrationsForStats.totalItems;
        
        // Get unique client count (avoiding concurrent request)
        const uniqueClients = new Set(allRegistrationsForStats.items.map(r => r.client)).size;



        return {
            user: locals.user,
            mode: 'events_overview',
            events: eventsWithStats,
            stats: {
                waitingConfirmation: waitingTotal,
                paid: paidTotal,
                totalRegistrations: totalRegistrations,
                totalClients: uniqueClients
            }
        };
    } catch (e) {
        console.error('Error loading registrations:', e);
        
        // Return empty data but don't show missing collections warning since they exist
        return {
            user: locals.user,
            mode: 'events_overview',
            events: [],
            stats: {
                waitingConfirmation: 0,
                paid: 0,
                totalRegistrations: 0,
                totalClients: 0
            }
        };
    }
};

export const actions: Actions = {
    updateStatus: async ({ request }) => {
        const formData = await request.formData();
        const registrationId = formData.get('registrationId') as string;
        const newStatus = formData.get('status') as string;

        if (!registrationId || !newStatus) {
            return { success: false, error: 'Puuduvad kohustuslikud väljad' };
        }

        // Validate status
        const validStatuses = ['waiting_confirmation', 'confirmed', 'paid', 'cancelled'];
        if (!validStatuses.includes(newStatus)) {
            return { success: false, error: 'Vigane staatus' };
        }

        try {
            const adminPb = await pbAsAdmin();
            
            const updateData = {
                status: newStatus
            };
            
            await adminPb.collection('event_registrations').update(registrationId, updateData);
            
            return { success: true, message: 'Staatus edukalt uuendatud' };
        } catch (e: any) {
            console.error('Error updating registration status:', e);
            console.error('Error details:', {
                url: e.url,
                status: e.status,
                response: e.response,
                data: e.response?.data
            });
            return { success: false, error: `Viga staatuse uuendamisel: ${e.response?.message || e.message}` };
        }
    },

    updateNotes: async ({ request }) => {
        const formData = await request.formData();
        const registrationId = formData.get('registrationId') as string;
        const notes = formData.get('notes') as string;

        if (!registrationId) {
            return { success: false, error: 'Registreeringu ID puudub' };
        }

        try {
            const adminPb = await pbAsAdmin();
            
            await adminPb.collection('event_registrations').update(registrationId, {
                notes: notes || '',
                updated: new Date().toISOString()
            });
            
            return { success: true, message: 'Märkused edukalt uuendatud' };
        } catch (e) {
            console.error('Error updating registration notes:', e);
            return { success: false, error: 'Viga märkuste uuendamisel' };
        }
    }
}; 