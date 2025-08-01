<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import { ArrowRight, Waves, Calendar, MapPin, Users, Camera, CheckCircle, Clock } from 'lucide-svelte';
	import { EVENT_TYPE_COLORS } from '$lib/types/events';
	import type { DiveEvent } from '$lib/types/events';

	interface Props {
		safariEvents?: DiveEvent[];
	}

	let { safariEvents = [] }: Props = $props();

	// Helper functions from events calendar
	function formatDate(dateString: string): string {
		if (!dateString) return '';
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			console.warn('Invalid date string:', dateString);
			return dateString;
		}
		return date.toLocaleDateString('et-EE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	function formatTime(time?: string): string {
		if (!time) return '';
		if (time.match(/^\d{2}:\d{2}$/)) {
			return time;
		}
		if (time.includes('T')) {
			const date = new Date(time);
			if (!isNaN(date.getTime())) {
				return date.toLocaleTimeString('et-EE', {
					hour: '2-digit',
					minute: '2-digit',
					timeZone: 'Europe/Tallinn'
				});
			}
		}
		return time;
	}

	function getEventTypeStyle(type: DiveEvent['type']) {
		return EVENT_TYPE_COLORS[type];
	}

	function getDaysUntilEvent(dateString: string): number {
		if (!dateString) return -1;
		const eventDate = new Date(dateString);
		if (isNaN(eventDate.getTime())) {
			console.warn('Invalid event date:', dateString);
			return -1;
		}
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		eventDate.setHours(0, 0, 0, 0);
		const diffTime = eventDate.getTime() - today.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	function isUpcoming(dateString: string): boolean {
		return getDaysUntilEvent(dateString) >= 0;
	}

	// Safari card component to reuse in both grid and carousel
	function SafariCard(event: DiveEvent) {
		return {
			event
		};
	}
</script>

<!-- Safaris Section -->
<section id="safaris" class="relative bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 overflow-hidden" style="padding-top: 8rem; padding-bottom: 8rem;">
	<!-- Wave Border - positioned to extend white background -->
	<div class="absolute -top-1 left-0 w-full overflow-hidden leading-none">
		<svg class="relative block w-full h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white"></path>
		</svg>
	</div>
	
	<!-- Background Elements -->
	<div class="bg-white"></div>
    <div class="bg-black/20"></div>
	<div class="absolute top-0 left-0 w-full h-full opacity-10">
		<div class="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
		<div class="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
	</div>

	<div class="container mx-auto px-6 relative z-10">
		<div class="max-w-7xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-20 mt-16">
				<h2 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
					Avasta maailma parimaid
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
						sukeldumispaiku
					</span>
				</h2>
				
				<p class="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
					Liitu meie kogenud instruktoritega põnevatel sukeldumissafaridel. 
					Korraldame reise maailma kõige ilusamatesse ja eksootilisematesse kohtadesse, 
					kus iga sukeldumine toob kaasa unustamatuid elamusi.
				</p>
			</div>

			<!-- Main Content Grid -->
			<div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
				<!-- Left: Feature Image -->
				<div class="relative group">
					<div class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
						<img
							src="/photos/india-o-safari.png"
							alt="Sukeldumissafari laev kristallselges vees"
							class="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						
						
						<!-- Bottom Info -->
						<div class="absolute bottom-6 left-6 right-6">
							<h3 class="text-2xl font-bold text-white mb-2">Saudi Araabia rannikul</h3>
							<p class="text-blue-100 text-sm">Korallriffid ja eksootilised mereeluvoormid</p>
						</div>
					</div>
				</div>

				<!-- Right: Content -->
				<div class="space-y-8">
					<div>
						<h3 class="text-3xl font-bold text-white mb-6">
							Miks valida meie safari?
						</h3>
						
						<div class="space-y-6">
							<div class="flex items-start space-x-4">
								<div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
									<Users class="h-6 w-6 text-white" />
								</div>
								<div>
									<h4 class="font-semibold text-white mb-2">Kogenud instruktorid</h4>
									<p class="text-blue-100 leading-relaxed">
										Meie PADI ja IANTD sertifitseeritud instruktorid tagavad ohutuse ja 
										jagavad põnevaid teadmisi kohalikust mereajalust.
									</p>
								</div>
							</div>
							
							<div class="flex items-start space-x-4">
								<div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
									<MapPin class="h-6 w-6 text-white" />
								</div>
								<div>
									<h4 class="font-semibold text-white mb-2">Eksklusiivised asukohad</h4>
									<p class="text-blue-100 leading-relaxed">
										Viime sind kohtadesse, kuhu jõuavad vaid väikesed grupid. 
										Avasta puutumatu loodust ja haruldasi mereloomi.
									</p>
								</div>
							</div>
							
							<div class="flex items-start space-x-4">
								<div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
									<Camera class="h-6 w-6 text-white" />
								</div>
								<div>
									<h4 class="font-semibold text-white mb-2">Unustamatued mälestused</h4>
									<p class="text-blue-100 leading-relaxed">
										Iga reis on hoolikalt planeeritud, et pakkuda maksimaalset 
										naudingut ja luua eluks ajaks meeles püsivaid mälestusi.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- CTA Button -->
			<div class="text-center">
				<Button 
					variant="ghost"
					class="group text-white hover:text-orange-500 hover:bg-transparent transition-colors duration-200"
					onclick={() => (window.location.href = '/uritused')}
				>
					Vaata kõiki reise
					<ArrowRight class="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
				</Button>
			</div>
		</div>
	</div>

	<!-- Wave Border Bottom - positioned to extend to next section -->
	<div class="absolute -bottom-1 left-0 w-full overflow-hidden leading-none rotate-180">
		<svg class="relative block w-full h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
			<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white"></path>
		</svg>
	</div>
</section>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>