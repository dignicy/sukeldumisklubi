<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-svelte';

	// Page data configuration - customize for each page
	const pageData = {
		title: 'Proovisukeldumine',
		subtitle: 'Avasta sukeldumise maailm koos meiega - turvaline ja juhendatud sissejuhatus veealusesse maailma',
		heroImage: '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp',
	};

	// Sidebar configuration - reusable across pages
	const sidebarConfig = {
		questionSection: {
			title: 'Tekkis küsimus?',
			description: 'Küsimuste korral võite meiega julgelt ühendust võtta.'
		},
		contactSection: {
			title: 'Kontaktvõimalused',
			address: 'Õnne 43, Tartu linn, 50106',
			hours: 'E-R 10.00 - 18.00',
			phone: '(+372) 5300 0008',
			email: 'info@sukeldumisklubi.ee'
		},
		ctaButton: {
			text: 'Saada meile kiri',
			link: '/kontakt'
		},
		images: [
			'/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp'
		],
		imageCtaButton: {
			text: 'Vaata üritustekalendrit',
			link: '/uritused'
		}
	};
</script>

<svelte:head>
	<title>{pageData.title} - Sukeldumiskeskus</title>
	<meta name="description" content={pageData.subtitle} />
</svelte:head>

<!-- Hero Section -->
<section class="relative flex items-center justify-center overflow-hidden bg-white py-4 px-4 h-[400px] md:h-[500px]">
	<div class="relative w-full max-w-screen bg-black rounded-3xl overflow-hidden h-full">
		<!-- Background -->
		<div class="absolute inset-0 z-0">
			<img 
				src={pageData.heroImage}
				alt={pageData.title}
				class="w-full h-full object-cover"
				loading="eager"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>

		<!-- Content Overlay -->
		<div class="absolute bottom-0 left-0 right-0 p-8 z-10">
			<div class="max-w-7xl mx-auto px-6">
				<div class="max-w-4xl">
					<h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
						{pageData.title}
					</h1>
					
					<p class="text-xl text-blue-100 max-w-3xl">
						{pageData.subtitle}
					</p>
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
				<!-- Trial Diving Content -->
				<div class="max-w-4xl">
					<div class="space-y-6 text-gray-700 leading-relaxed">
						<p class="text-lg">
							Sukeldumine on põnev sportlik harrastus, mis ei nõua suurt füüsilist pingutust ega erilist osavust, küll aga lõõgastab, maandab pingeid ja pakub uskumatuid seiklusi.
						</p>
						
						<p>
							Parim võimalus kindlaks teha, kas sukeldumine on sulle sobiv meelelahutus, on tulla proovisukeldumisele (e. Discover Scuba Diving) ja avastada endale uus ja põnev vabaaja veetmise võimalus.
						</p>
						
						<p>
							Proovisukeldumisel tutvustatakse sukeldumist ja sukeldumisvarustust ning sooritatakse instruktori käekõrval sukeldumine. Proovija ei pea midagi muud tegema, kui silmad lahti hoidma ja ümbrust nautima, instruktor teeb kõik tehnilise poole teie eest ise ära.
						</p>
						
						<p class="text-orange-600 font-medium">
							Proovisukeldumine on veel põnevam kui seda teha koos sõpradega.
						</p>
						
						<p>
							Kui proovisukeldumise järel selgub, et sukeldumine on just see mida oled otsinud siis võib kohe jätkata algkursusega. Sukeldumislitsentsi omamine annab Teile võimaluse avastada imelist veealust maailma ja muuta oma puhkusereisid meeldejäävamaks ning seiklusrikkamaks.
						</p>
						
						<div class="bg-orange-50 border border-orange-200 rounded-2xl p-6 mt-8">
							<h3 class="text-xl font-bold text-gray-900 mb-4">
								Registreeru proovisukeldumisele
							</h3>
							<div class="space-y-3 mb-4">
								<a href="mailto:info@sukeldumisklubi.ee" class="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
									<Mail class="h-4 w-4 text-orange-600 mr-3" />
									<span class="font-medium">info@sukeldumisklubi.ee</span>
								</a>
								<a href="tel:+37253001229" class="flex items-center text-gray-700 hover:text-orange-600 transition-colors">
									<Phone class="h-4 w-4 text-orange-600 mr-3" />
									<span class="font-medium">53001229</span>
								</a>
							</div>
							<a href="/sukeldumiskursused-algajatele" class="inline-flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors">
								<span>Tutvu ka sukeldumiskursustega</span>
								<svg class="h-3 w-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
								</svg>
							</a>
						</div>
						
						<p class="text-sm text-gray-600 italic mt-6">
							Sukeldumisklubi korraldab proovisukeldumisi nii basseinis kui ka avavees.
						</p>
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="lg:sticky lg:top-28 space-y-6 h-fit">
				<!-- Question Section -->
				<div class="bg-gradient-to-br from-slate-50 to-orange-50 rounded-3xl p-6 border border-slate-200">
					<h3 class="text-xl font-bold text-gray-900 mb-3">{sidebarConfig.questionSection.title}</h3>
					<p class="text-gray-600 text-sm mb-5">{sidebarConfig.questionSection.description}</p>
					
					<h4 class="text-lg font-bold text-gray-900 mb-4">{sidebarConfig.contactSection.title}</h4>
					
					<div class="space-y-3 mb-6">
						<div class="flex items-center text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
								<MapPin class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.address}</span>
						</div>
						
						<div class="flex items-center text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
								<Clock class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.hours}</span>
						</div>
						
						<div class="flex items-center text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
								<Phone class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.phone}</span>
						</div>
						
						<div class="flex items-center text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
								<Mail class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.email}</span>
						</div>
					</div>

					<!-- CTA Button -->
					<Button 
						class="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 text-sm font-medium"
						onclick={() => window.location.href = sidebarConfig.ctaButton.link}
					>
						{sidebarConfig.ctaButton.text}
					</Button>
				</div>

				<!-- Images Section -->
				{#if sidebarConfig.images && sidebarConfig.images.length > 0}
					<div class="space-y-4">
						{#each sidebarConfig.images as image}
							<div class="relative overflow-hidden rounded-2xl bg-gray-100">
								<img 
									src={image} 
									alt="Sukeldumise pilt"
									class="w-full h-48 object-cover"
								/>
								<!-- Bottom CTA -->
								<div class="absolute bottom-4 left-4 right-4">
									<Button 
										class="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300"
										onclick={() => window.location.href = sidebarConfig.imageCtaButton.link}
									>
										<Calendar class="h-4 w-4 mr-2" />
										{sidebarConfig.imageCtaButton.text}
									</Button>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
