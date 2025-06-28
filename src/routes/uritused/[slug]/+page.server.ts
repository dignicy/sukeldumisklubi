import { pbAsAdmin } from '$lib/server/pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const pb = await pbAsAdmin();
        
        // Fetch the specific event by page_slug
        const events = await pb.collection('events').getList(1, 1, {
            filter: `page_slug = "${params.slug}"`
        });
        
        if (events.items.length === 0) {
            throw error(404, 'Event not found');
        }
        
        const event = events.items[0];

        // Transform the event data similar to the calendar page
        const transformedEvent = {
            ...event,
            // Create proper PocketBase file URL for cover image
            image: event.cover_image ? `${PUBLIC_POCKETBASE_URL}/api/files/events/${event.id}/${event.cover_image}` : 
                   event.image ? `${PUBLIC_POCKETBASE_URL}/api/files/events/${event.id}/${event.image}` : 
                   '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp',
            
            // Transform gallery images if they exist
            galleryImages: event.gallery ? event.gallery.map((img: string) => 
                `${PUBLIC_POCKETBASE_URL}/api/files/events/${event.id}/${img}`
            ) : [],
            
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
            price: event.price || null,
            instructor: event.instructor || null,
            difficulty: event.difficulty || null,
            registrationDeadline: event.registration_deadline || event.registrationDeadline || null,
            locationPin: event.location_pin || null,
            pageSlug: event.page_slug || null
        };

        return {
            event: transformedEvent
        };
    } catch (err: any) {
        console.error('Failed to fetch event:', err);
        console.error('Event slug:', params.slug);
        console.error('Error details:', {
            message: err?.message,
            status: err?.status,
            url: err?.url
        });
        
        // Return 404 if event not found
        throw error(404, 'Event not found');
    }
}; 