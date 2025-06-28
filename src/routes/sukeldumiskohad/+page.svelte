<script lang="ts">

	import { Button } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Clock, Calendar, Waves, TreePine, Anchor } from 'lucide-svelte';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';


	// Template configuration - easily customizable
	const pageTitle = 'Sukeldumiskohad';
	const pageSubtitle = 'Avasta Eesti parimaid sukeldumiskohti';
	const heroImage = '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
	
	const introText = `Eesti pakub mitmekesiseid ja põnevaid sukeldumiskohti nii algajatele kui ka kogenud sukeldujatele. Vali endale sobiv kategooria ja avasta meie veealune maailm.`;

	// Sidebar configuration - easily customizable
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

	// Diving site categories
	const categories = [
		{
			id: 'meri',
			title: 'Meri',
			description: 'Sukeldumiskohad Läänemeres ja rannikualadel',
			icon: Waves,
			color: 'from-blue-500 to-cyan-500',
			href: '/sukeldumiskohad/meri'
		},
		{
			id: 'siseveekogud',
			title: 'Siseveekogud',
			description: 'Järved, jõed ja teised siseveekogud',
			icon: TreePine,
			color: 'from-green-500 to-emerald-500',
			href: '/sukeldumiskohad/siseveekogud'
		},
		{
			id: 'vrakid',
			title: 'Vrakid',
			description: 'Ajaloolised laevavrakkide sukeldumiskohad',
			icon: Anchor,
			color: 'from-orange-500 to-red-500',
			href: '/sukeldumiskohad/vrakid'
		}
	];
</script>

<svelte:head>
	<title>{pageTitle} - Sukeldumiskeskus</title>
	<meta name="description" content={pageSubtitle} />
</svelte:head>

<!-- Hero Section -->
<section class="relative flex items-center justify-center overflow-hidden bg-white py-4 px-4 h-[400px] md:h-[500px]">
	<div class="relative w-full max-w-screen bg-black rounded-3xl overflow-hidden h-full">
		<!-- Background -->
		<div class="absolute inset-0 z-0">
			<img 
				src={heroImage}
				alt={pageTitle}
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
						{pageTitle}
					</h1>
					
					<p class="text-xl text-blue-100 max-w-3xl">
						{pageSubtitle}
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
			<p class="text-lg text-gray-700 leading-relaxed">
				{introText}
			</p>

			<!-- Category Cards -->
			<div class="space-y-6">
				<h2 class="text-3xl font-bold text-gray-900 mb-8">Kategooriad</h2>
				
				<div class="grid gap-6">
					{#each categories as category}
						<Card class="border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer" onclick={() => window.location.href = category.href}>
							<CardContent class="p-6">
								<div class="flex items-center space-x-4">
									<div class="w-12 h-12 bg-gradient-to-r {category.color} rounded-lg flex items-center justify-center">
										<svelte:component this={category.icon} class="h-6 w-6 text-white" />
									</div>
									<div class="flex-1">
										<h3 class="text-xl font-semibold text-gray-900 mb-1">{category.title}</h3>
										<p class="text-gray-600">{category.description}</p>
									</div>
									<div class="text-gray-400">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
										</svg>
									</div>
								</div>
							</CardContent>
						</Card>
					{/each}
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
