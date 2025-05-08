import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import type { BaseModel, ListResult } from 'pocketbase';
import { writable } from 'svelte/store';

// Create a single instance for the entire app
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

export const currentUser = writable<AuthModel | null>(null);

// Type for the authenticated user
export type AuthModel = {
    id: string;
    email: string;
    // Add other user fields you need
} & BaseModel;

// Export the PocketBase instance
export { pb as pocketbase };
export type { ListResult };