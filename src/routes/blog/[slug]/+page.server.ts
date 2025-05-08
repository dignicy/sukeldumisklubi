import { pbAsAdmin } from '@/server/pocketbase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const pb = await pbAsAdmin()
        const slug = params.slug
        const blog = await pb.collection('blogs').getFirstListItem(`slug="${slug}"`);

        
        if (!blog) {
            throw error(404, 'Blog post not found');
        }

        pb.collection('blogs').update(blog.id, {
            views: blog.views + 1
        });

        return {
            blog
        };
    } catch (err) {
        throw error(404, 'Blog post not found');
    }
};
