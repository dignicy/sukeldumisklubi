<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import NavHeader from '$lib/components/ui/blocks/NavHeader.svelte';
	import Footer from '$lib/components/ui/blocks/footer.svelte';
	let { children, data } = $props();
	
	// Hide header and footer on auth and dashboard routes
	let hideHeaderFooter = $derived($page.route.id?.includes('(auth)') || $page.route.id?.includes('/dashboard'));
</script>

{#if !hideHeaderFooter}
	<NavHeader />
{/if}
{@render children()}
{#if !hideHeaderFooter}
	<Footer />
{/if}