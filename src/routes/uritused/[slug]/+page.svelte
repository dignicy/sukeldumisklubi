<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Badge } from "$lib/components/ui/badge";
	import { Card, CardContent } from "$lib/components/ui/card";
	import EventRegistrationDialog from "$lib/components/EventRegistrationDialog.svelte";

	import { 
		Calendar as CalendarIcon, 
		MapPin, 
		Users, 
		Clock, 
		Euro,
		GraduationCap,
		AlertCircle,
		ExternalLink,
		ArrowLeft,
		Share2,
		Phone,
		Mail,
		Check
	} from "lucide-svelte";
	import { EVENT_TYPE_COLORS } from "$lib/types/events";
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const event = data.event;

	// Format date for display
	function formatDate(dateString: string): string {
		if (!dateString) return '';
		const date = new Date(dateString);
		if (isNaN(date.getTime())) return dateString;
		
		return date.toLocaleDateString('et-EE', { 
			day: 'numeric', 
			month: 'long',
			year: 'numeric'
		});
	}

	function formatTime(time?: string): string {
		if (!time) return '';
		if (time.match(/^\d{2}:\d{2}$/)) return time;
		return time;
	}

	function getEventTypeStyle(type: string) {
		return EVENT_TYPE_COLORS[type as keyof typeof EVENT_TYPE_COLORS] || EVENT_TYPE_COLORS['Üritus'];
	}

	function getDaysUntilEvent(dateString: string): number {
		if (!dateString) return -1;
		const eventDate = new Date(dateString);
		if (isNaN(eventDate.getTime())) return -1;
		
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		eventDate.setHours(0, 0, 0, 0);
		
		const diffTime = eventDate.getTime() - today.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	function stripHtml(html: string): string {
		return html.replace(/<[^>]*>/g, '');
	}

	let daysUntil = $derived(getDaysUntilEvent(event.startDate));
	let linkCopied = $state(false);
	let registrationDialogOpen = $state(false);

	async function copyEventUrl() {
		try {
			await navigator.clipboard.writeText(window.location.href);
			linkCopied = true;
			setTimeout(() => {
				linkCopied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy URL:', err);
		}
	}
</script>

<svelte:head>
	<title>{event.title} - Sukeldumisklubi</title>
	<meta name="description" content={stripHtml(event.description || event.excerpt)} />
</svelte:head>

<!-- Hero Section -->
<section class="relative flex items-center justify-center overflow-hidden bg-white py-4 px-4 h-[500px] md:h-[600px]">
	<!-- Card Container -->
	<div class="relative w-full max-w-screen bg-black rounded-3xl overflow-hidden h-full">
		<!-- Background -->
		<div class="absolute inset-0 z-0">
			<img 
				src={event.image} 
				alt={event.title}
				class="w-full h-full object-cover"
				loading="eager"
				decoding="async"
				draggable="false"
				onerror={(e) => { (e.currentTarget as HTMLImageElement).src = '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp'; }}
			/>
			<!-- Black overlay -->
			<div class="absolute inset-0 bg-black/50"></div>
		</div>

		<!-- Event Info Overlay -->
		<div class="absolute bottom-0 left-0 right-0 p-8 z-10">
			<div class="max-w-7xl mx-auto px-6">
				<div class="max-w-4xl">
					<div class="flex flex-wrap items-center gap-3 mb-6">
						<Badge variant="secondary" class="px-4 py-2 text-sm font-medium {getEventTypeStyle(event.type).bg} {getEventTypeStyle(event.type).text}">
							{event.type}
						</Badge>
						{#if daysUntil >= 0 && daysUntil <= 7}
							<Badge variant="destructive" class="px-4 py-2 text-sm font-medium">
								{daysUntil === 0 ? 'Täna' : daysUntil === 1 ? 'Homme' : `${daysUntil} päeva pärast`}
							</Badge>
						{/if}
						{#if event.price}
							<Badge variant="outline" class="bg-white/90 text-gray-900 px-4 py-2 text-sm font-semibold border-white/30">
								<Euro class="h-3 w-3 mr-1" />
								{event.price}
							</Badge>
						{/if}
					</div>
					
					<h1 class="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
						{event.title}
					</h1>
					
					<div class="flex flex-wrap items-center gap-4">
						<Badge variant="outline" class="bg-black/30 border-white/30 text-white px-4 py-2">
							<CalendarIcon class="h-4 w-4 mr-2" />
							{formatDate(event.startDate)}
						</Badge>
						{#if event.startTime}
							<Badge variant="outline" class="bg-black/30 border-white/30 text-white px-4 py-2">
								<Clock class="h-4 w-4 mr-2" />
								{formatTime(event.startTime)}
							</Badge>
						{/if}
						<Badge variant="outline" class="bg-black/30 border-white/30 text-white px-4 py-2">
							<MapPin class="h-4 w-4 mr-2" />
							{event.location}
						</Badge>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Main Content -->
<section class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid lg:grid-cols-3 gap-16">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-16">
				<!-- Description Section -->
				<div class="max-w-4xl space-y-6">
					<h2 class="text-3xl font-bold text-gray-900 leading-tight">
						Ürituse kirjeldus
					</h2>
					
					<div class="text-lg text-gray-700 leading-relaxed [&>p]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-gray-900 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-gray-900 [&>h3]:mb-3 [&>ul]:mb-4 [&>ul]:pl-0 [&>ol]:mb-4 [&>ol]:pl-0 [&>li]:mb-1 [&>strong]:font-semibold">
						{@html event.description}
					</div>
				</div>

				<!-- Gallery Section -->
				{#if event.galleryImages && event.galleryImages.length > 0}
					<div class="max-w-4xl space-y-6">
						<h2 class="text-3xl font-bold text-gray-900 leading-tight">
							Pildigalerii
						</h2>
						
						<div class="grid md:grid-cols-2 gap-6">
							{#each event.galleryImages as image}
								<div class="group relative overflow-hidden rounded-2xl bg-gray-100">
									<img 
										src={image} 
										alt="Gallery image"
										class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
										onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
									/>
									<div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Sidebar -->
			<div class="lg:sticky lg:top-28 space-y-6 h-fit">
				<!-- Quick Details -->
				<div class="bg-gradient-to-br from-slate-50 to-orange-50 rounded-3xl p-6 border border-slate-200">
					<h3 class="text-xl font-bold text-gray-900 mb-5">Ürituse info</h3>
					
					<div class="space-y-4">
						<div class="flex items-center justify-between py-2 border-b border-slate-200">
							<div class="flex items-center text-gray-600">
								<CalendarIcon class="h-4 w-4 mr-2" />
								<span class="text-sm">Algus</span>
							</div>
							<span class="font-medium text-gray-900 text-sm">
								{new Date(event.startDate).toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}{event.startTime ? `, ${formatTime(event.startTime)}` : ''}
							</span>
						</div>

						{#if event.endDate && event.endDate !== event.startDate}
							<div class="flex items-center justify-between py-2 border-b border-slate-200">
								<div class="flex items-center text-gray-600">
									<CalendarIcon class="h-4 w-4 mr-2" />
									<span class="text-sm">Lõpp</span>
								</div>
								<span class="font-medium text-gray-900 text-sm">
									{new Date(event.endDate).toLocaleDateString('et-EE', { day: '2-digit', month: '2-digit', year: 'numeric' })}{event.endTime ? `, ${formatTime(event.endTime)}` : ''}
								</span>
							</div>
						{/if}
						
						<div class="flex items-center justify-between py-2 border-b border-slate-200">
							<div class="flex items-center text-gray-600">
								<MapPin class="h-4 w-4 mr-2" />
								<span class="text-sm">Asukoht</span>
							</div>
							{#if event.locationPin}
								<button 
									class="font-medium text-blue-600 hover:text-blue-800 text-right underline text-sm"
									onclick={() => window.open(event.locationPin, '_blank')}
								>
									{event.location}
								</button>
							{:else}
								<span class="font-medium text-gray-900 text-right text-sm">{event.location}</span>
							{/if}
						</div>
						
						{#if event.maxParticipants}
							<div class="flex items-center justify-between py-2">
								<div class="flex items-center text-gray-600">
									<Users class="h-4 w-4 mr-2" />
									<span class="text-sm">Kohti kokku</span>
								</div>
								<span class="font-medium text-gray-900 text-sm">{event.maxParticipants}</span>
							</div>
						{/if}

						{#if event.instructor}
							<div class="flex items-center justify-between py-2 border-b border-slate-200">
								<div class="flex items-center text-gray-600">
									<GraduationCap class="h-4 w-4 mr-2" />
									<span class="text-sm">Instruktor</span>
								</div>
								<span class="font-medium text-gray-900 text-sm">{event.instructor}</span>
							</div>
						{/if}

						{#if event.difficulty}
							<div class="flex items-center justify-between py-2">
								<div class="flex items-center text-gray-600">
									<AlertCircle class="h-4 w-4 mr-2" />
									<span class="text-sm">Raskusaste</span>
								</div>
								<Badge variant="secondary" class="text-xs font-medium">{event.difficulty}</Badge>
							</div>
						{/if}
					</div>
				</div>

				<!-- Registration Section -->
				<div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
					<h3 class="text-xl font-bold text-gray-900 mb-5">Registreerimine</h3>
					
					{#if event.registrationDeadline}
						<div class="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-xl">
							<div class="flex items-center text-amber-800">
								<AlertCircle class="h-4 w-4 mr-2 flex-shrink-0" />
								<span class="text-xs font-medium">
									Registreerimine kuni {formatDate(event.registrationDeadline)}
								</span>
							</div>
						</div>
					{/if}

					<div class="space-y-3 mb-6">
						<Button 
							class="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-10" 
							size="default"
							onclick={() => registrationDialogOpen = true}
						>
							<Users class="h-4 w-4 mr-2" />
							Registreeru üritusel
						</Button>
						
						<Button variant="outline" class="w-full rounded-xl h-10 border-2 hover:bg-gray-50" onclick={copyEventUrl}>
							{#if linkCopied}
								<Check class="h-4 w-4 mr-2 text-green-600" />
								Ürituse link kopeeritud
							{:else}
								<Share2 class="h-4 w-4 mr-2" />
								Jaga sõpradega
							{/if}
						</Button>
					</div>

					<div class="pt-5 border-t border-gray-200">
						<p class="text-sm font-medium text-gray-900 mb-3">Tekkis küsimusi? Võta meiega ühendust!</p>
						<div class="space-y-2">
							<div class="flex items-center text-gray-600">
								<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-2">
									<Phone class="h-3 w-3 text-orange-600" />
								</div>
								<span class="text-sm font-medium">(+372) 5300 0008</span>
							</div>
							<div class="flex items-center text-gray-600">
								<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-2">
									<Mail class="h-3 w-3 text-orange-600" />
								</div>
								<span class="text-sm font-medium">info@sukeldumisklubi.ee</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Location Section -->
				{#if event.locationPin}
					<div class="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
						<h3 class="text-xl font-bold text-gray-900 mb-5">Asukoht</h3>
						<Button 
							variant="outline" 
							class="w-full rounded-xl h-10 border-2 hover:bg-gray-50"
							onclick={() => window.open(event.locationPin, '_blank')}
						>
							<ExternalLink class="h-4 w-4 mr-2" />
							Ava Google Maps-is
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<!-- Registration Dialog -->
<EventRegistrationDialog 
	{event} 
	open={registrationDialogOpen} 
	onOpenChange={(open) => registrationDialogOpen = open} 
/>

<style>
	.prose {
		color: #374151;
	}
	.prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
		color: #111827;
		font-weight: 600;
		margin-top: 1.5em;
		margin-bottom: 0.5em;
	}
	.prose p {
		margin-bottom: 1em;
		line-height: 1.7;
	}
	.prose ul, .prose ol {
		margin-bottom: 1em;
		padding-left: 1.5em;
	}
	.prose li {
		margin-bottom: 0.5em;
	}
</style> 