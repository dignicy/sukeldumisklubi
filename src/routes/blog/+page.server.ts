import { pbAsAdmin } from '$lib/server/pocketbase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const pb = await pbAsAdmin();
    
    const blogs = await pb.collection('blogs').getList(1, 100, {
        sort: '-created',
    });

    return {
        blogs: blogs.items
    };
};
