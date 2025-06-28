import { pbAsAdmin } from '$lib/server/pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { PageServerLoad } from '../kalender/$types';

export const load: PageServerLoad = async () => {
    try {
        const pb = await pbAsAdmin();
        
        // First try to get events without sorting to see if collection exists
        const events = await pb.collection('events').getList(1, 100);

        // Transform events to include proper image URLs and standardize field names
        const transformedEvents = events.items.map(event => {
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
                type: event.type || event.category || 'Üritus',
                location: event.location || event.venue || event.place || 'TBA',
                
                // Additional fields from your PocketBase structure
                maxParticipants: event.max_participants || event.maxParticipants || null,
                currentParticipants: event.current_participants || event.currentParticipants || 0,
                pageSlug: event.page_slug || null
            };
        });

        return {
            events: transformedEvents,
            pocketbaseUrl: PUBLIC_POCKETBASE_URL
        };
    } catch (err: any) {
        console.error('Failed to fetch events:', err);
        console.error('Error details:', {
            message: err?.message,
            status: err?.status,
            url: err?.url
        });
        
        // Return empty array if collection doesn't exist or other error
        return {
            events: []
        };
    }
}; 