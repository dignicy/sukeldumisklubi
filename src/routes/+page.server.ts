import { pbAsAdmin } from '$lib/server/pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    try {
        const pb = await pbAsAdmin();
        
        // First, let's fetch ALL events to see what we have and debug the issue
        const allEvents = await pb.collection('events').getList(1, 50, {
            sort: '-start_time'
        });
        
        // Now filter for safari events (try different possible type values)
        const safariEvents = allEvents.items.filter(event => 
            event.type === 'Reis' || 
            event.type === 'reis' || 
            event.type === 'Safari' || 
            event.type === 'safari' ||
            event.type === 'Travel' ||
            event.type === 'travel'
        );

        // Transform events to include proper image URLs and standardize field names
        const transformedEvents = safariEvents.map(event => {
            return {
                ...event,
                // Create proper PocketBase file URL if image field exists
                image: event.cover_image ? `${PUBLIC_POCKETBASE_URL}/api/files/events/${event.id}/${event.cover_image}` : 
                       event.image ? `${PUBLIC_POCKETBASE_URL}/api/files/events/${event.id}/${event.image}` : 
                       '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp',
                
                // Extract proper dates and times from PocketBase datetime fields
                startDate: event.start_time ? new Date(event.start_time).toISOString().split('T')[0] : (event.startDate || event.start_date || event.date),
                endDate: event.end_time ? new Date(event.end_time).toISOString().split('T')[0] : (event.endDate || event.end_date),
                startTime: event.start_time ? new Date(event.start_time).toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Tallinn' }) : (event.startTime || event.time),
                endTime: event.end_time ? new Date(event.end_time).toLocaleTimeString('et-EE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Tallinn' }) : (event.endTime),
                
                // Ensure we have required fields with fallbacks
                title: event.title || event.name || 'Unnamed Event',
                description: event.description || event.content || '',
                excerpt: event.excerpt || event.summary || (event.description || '').substring(0, 150) + '...',
                type: event.type || event.category || 'Reis',
                location: event.location || event.venue || event.place || 'TBA',
                
                // Additional fields from your PocketBase structure
                maxParticipants: event.max_participants || event.maxParticipants || null,
                currentParticipants: event.current_participants || event.currentParticipants || 0,
                pageSlug: event.page_slug || null,
                price: event.price || null
            };
        });

        // Separate upcoming and past events
        const now = new Date();
        const upcomingEvents = transformedEvents.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate >= now;
        }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        
        const pastEvents = transformedEvents.filter(event => {
            const eventDate = new Date(event.startDate);
            return eventDate < now;
        }).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

        // Take 3 upcoming events first, if not enough, fill with past events
        let finalSafariEvents = [];
        if (upcomingEvents.length >= 3) {
            finalSafariEvents = upcomingEvents.slice(0, 3);
        } else {
            finalSafariEvents = [...upcomingEvents, ...pastEvents.slice(0, 3 - upcomingEvents.length)];
        }

        return {
            safariEvents: finalSafariEvents
        };
    } catch (err: any) {
        console.error('Failed to fetch safari events:', err);
        
        // Return empty array if collection doesn't exist or other error
        return {
            safariEvents: []
        };
    }
}; 