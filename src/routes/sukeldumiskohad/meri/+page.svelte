<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Clock, Calendar, Waves, AlertTriangle, User } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	// Template configuration - easily customizable
	const pageTitle = 'Meri';
	const pageSubtitle = 'Sukeldumiskohad merevees Eesti rannikul';
	const heroImage = '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
	
	const introText = `Merevesi Eestis on vähesoolane ja vähese läbipaistvusega. Heaks nähtavuseks loetakse juba 10 m, tavaline on 3-5 m nähtavust. Vahetevahel saab põhjakihis näha isegi 15 m kaugusele, kuid siis on vee temperatuur külm – vaid 3-7 kraadi. Nähtavus on parem varakevadel ja sügisel, suvel mikroorganismid paljunevad ja vesi hakkab "õitsema".`;

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

	// Sea diving sites data organized by regions - adding proper typing
	interface DivingSite {
		name: string;
		depth: string;
		special: boolean;
		note?: string;
	}
	
	interface Region {
		id: string;
		name: string;
		description?: string;
		additional_info?: string;
		coastal_info?: string;
		sites: DivingSite[];
	}

	const regionsData: { regions: Region[] } = {
		"regions": [
			{
				"id": "tallinn",
				"name": "Tallinn ja selle ümbrus",
				"sites": [
					{ "name": "Vrakk \"Bungsberg\"", "depth": "38 meetrit", "special": false },
					{ "name": "Vrakk \"Jaen Teär\"", "depth": "39 meetrit", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"Christine\"", "depth": "27 meetrit", "special": false },
					{ "name": "Vrakk \"Raa\"/\"Polaris\"", "depth": "26 meetrit", "special": false },
					{ "name": "Vrakk \"Riksens Ständer\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"Heino\"", "depth": "15 meetrit", "special": false },
					{ "name": "Vrakk \"Tutti\"", "depth": "16 meetrit", "special": false },
					{ "name": "Vrakk \"Vanja\"", "depth": "18 meetrit", "special": false },
					{ "name": "Vrakk \"Iljusha\"", "depth": "15 meetrit", "special": false },
					{ "name": "Vrakk \"Aegna\"", "depth": "kuni 6 meetrit", "special": false },
					{ "name": "Merekindlus \"Tsitadell\"", "depth": "kuni 11 m", "special": true, "note": "Muinsuskaitsealune objekt – sukeldumine erilubadega!" },
					{ "name": "nn. Kuulimuna", "depth": "kuni 9 meetrit", "special": false },
					{ "name": "Merivälja muul", "depth": "", "special": false }
				]
			},
			{
				"id": "saaremaa",
				"name": "Saaremaa",
				"description": "Saaremaa on Eesti suurim saar. Ta ulatus idast läände on 98 km, põhjast lõunasse 49 km, pindala 2714 ruukilommetrit. Saaremaad ümbritseb suur hulk väiksemaid saari, laidusid ja rahusid, mille arv ulatub üle 500, kuid see arv on muutuv. Merest kerkib järjest uusi saarekesi, enamasti on need väga väikesed, paljud ainult lindude pesitsuspaigad.",
				"additional_info": "Suuremad Saaremaa kaaslased on Muhu (200 ruutkilomeetrit), Abruka (10,6 ruutkilomeetrit) ja Vilsandi (8,9 ruutkilomeetrit). Igaühel neist on oma väikesed naabrid: Muhul – Keinastu, Kessulaid, Viirelaid, Võilaid, Suurlaid; Abrukal – Vahase saar, Linnusita saar ja Kasselaid; Vilsandil – Vaikad ja mitmed pangad. Pindalalt ei anna need saared Saaremaale palju juurde, venitavad aga hästi pikaks Saaremaa rannajoone, mille pikkus on ligi 1300 km.",
				"coastal_info": "Rannajoon on mitmekesine, vahelduv ja ilus. Siin on järske merre langevaid panku (eriti Saaremaa ja Muhu põhjarannikul), madalaid puhtaid liivarandu (Sõrves, Soela väina ääres), kõrgeid, otse vette laskuvaid luiteid (Järvel), eriti rohkesti aga maalilisi kivirikkaid rannakääre ja lahtesid kaugele merre ulatuvate poolsaare ja neemede-maaninadega.",
				"sites": [
					{ "name": "Panga pank", "depth": "", "special": false },
					{ "name": "Vrakk \"Stag\"", "depth": "", "special": false }
				]
			},
			{
				"id": "pohjarannik",
				"name": "Põhjarannik",
				"sites": [
					{ "name": "Vrakk \"Metallist\"", "depth": "", "special": false },
					{ "name": "Mohni saar ja selle ümbrus", "depth": "", "special": false },
					{ "name": "Vrakk \"Rasma\"", "depth": "", "special": false },
					{ "name": "Vrakk \"Fomalhaut\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"Kihelkonna\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"T-32\"", "depth": "", "special": false },
					{ "name": "Vrakk \"Viina Kuningas\"", "depth": "", "special": false }
				]
			},
			{
				"id": "looderannik",
				"name": "Looderannik",
				"sites": [
					{ "name": "Osmussaare ümbrus", "depth": "", "special": false },
					{ "name": "Neugrundi meteoriidikraater", "depth": "", "special": false },
					{ "name": "Vrakk \"Schleswig-Holstein\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"Dago\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" }
				]
			},
			{
				"id": "lohusalu-paldiski",
				"name": "Lohusalu ja Paldiski",
				"sites": [
					{ "name": "Vrakk \"Jossif Stalin\"", "depth": "", "special": false },
					{ "name": "Nabe saare ümbrus", "depth": "", "special": false },
					{ "name": "Lohusalu madal", "depth": "", "special": false },
					{ "name": "Suurupi madal", "depth": "", "special": false },
					{ "name": "Pakri paeastangud", "depth": "", "special": false }
				]
			},
			{
				"id": "hiiumaa",
				"name": "Hiiumaa",
				"description": "Hiiumaa rannajoon on väga hästi liigestunud. Rohkesti esineb poolsaari, neist suuremad on Kõpu ja Tahkuna, aga väga palju on ka väiksemaid, nagu Riidma, Rambi ja Ninametsa loodeosas, Sarve, Õunaku ja Salinõmme kagurannikul. Liigestatuse tõttu on rannajoon üsna pikk – umbes 300 km. Poolsaarte kaenaldesse jääb arvukalt lahti. Suuremad neist on Mardihansu lääne-, Luidja ja Reigi loode-, Tareste põhja- ning Jausa, Käina, Vaemla, Õunaku ja Soonlepa kagurannikul.",
				"sites": [
					{ "name": "Vrakk \"Vest\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"Ujuvdok\"", "depth": "", "special": false },
					{ "name": "Vrakk \"Skiv\"", "depth": "", "special": false },
					{ "name": "Vrakk \"Liisa\"", "depth": "", "special": false },
					{ "name": "Vrakk \"Krimulda\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"Linnea\"", "depth": "", "special": true, "note": "Muinsuskaitsealune vrakk – sukeldumine erilubadega!" },
					{ "name": "Vrakk \"Ilja Muromets\"", "depth": "", "special": false }
				]
			}
		]
	};

	// Extract regions from JSON data
	const regions = regionsData.regions;
</script>

<svelte:head>
	<title>{pageTitle} - Sukeldumiskeskus</title>
	<meta name="description" content={pageSubtitle} />
</svelte:head>

<!-- Hero Section -->
<section class="relative flex items-center justify-center overflow-hidden bg-white py-2 sm:py-4 px-2 sm:px-4 h-[300px] sm:h-[400px] md:h-[500px]">
	<div class="relative w-full max-w-screen bg-black rounded-2xl sm:rounded-3xl overflow-hidden h-full">
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
		<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
			<div class="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
				<div class="max-w-4xl">
					<h1 class="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
						{pageTitle}
					</h1>
					
					<p class="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-2xl lg:max-w-3xl leading-relaxed">
						{pageSubtitle}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Main Content -->
<section class="py-8 sm:py-12 lg:py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6">
		<div class="grid lg:grid-cols-3 gap-8 lg:gap-16">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-8 sm:space-y-12 lg:space-y-16">
				<p class="text-base sm:text-lg text-gray-700 leading-relaxed">
					{introText}
				</p>

				<!-- Regions Accordion -->
				<div class="space-y-4 sm:space-y-6">
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Sukeldumiskohad piirkondade kaupa</h2>
					
					<Accordion.Root type="multiple" class="w-full space-y-3 sm:space-y-4">
						{#each regions as region}
							<Accordion.Item value={region.id} class="border border-slate-200 rounded-xl overflow-hidden">
								<Accordion.Trigger class="flex w-full items-center justify-between bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-slate-100 transition-colors">
									<div class="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
										<div class="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Waves class="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
										</div>
										<div class="min-w-0 flex-1">
											<h3 class="text-lg sm:text-xl font-bold text-gray-900 truncate">{region.name}</h3>
											<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1 space-y-1 sm:space-y-0">
												<Badge variant="secondary" class="text-xs w-fit">
													{region.sites.length} sukeldumiskohta
												</Badge>
												{#if region.sites.some(site => site.special)}
													<Badge variant="destructive" class="text-xs w-fit">
														Muinsuskaitsealused objektid
													</Badge>
												{/if}
											</div>
										</div>
									</div>
								</Accordion.Trigger>
								
								<Accordion.Content class="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
									<div class="space-y-3 sm:space-y-4">
										<!-- Region Description -->
										{#if region.description}
											<p class="text-sm sm:text-base text-gray-700 leading-relaxed">
												{region.description}
											</p>
										{/if}
										
										{#if region.additional_info}
											<p class="text-sm sm:text-base text-gray-700 leading-relaxed">
												{region.additional_info}
											</p>
										{/if}
										
										{#if region.coastal_info}
											<p class="text-sm sm:text-base text-gray-700 leading-relaxed">
												{region.coastal_info}
											</p>
										{/if}

										<!-- Diving Sites List -->
										<div class="bg-slate-50 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
											<h4 class="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Sukeldumiskohad:</h4>
											<ul class="space-y-3 sm:space-y-2">
												{#each region.sites as site}
													<li class="space-y-1">
														<div class="flex items-start justify-between">
															<div class="flex items-start space-x-2 min-w-0 flex-1">
																<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
																<div class="min-w-0 flex-1">
																	<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
																		<span class="font-medium text-gray-700 text-sm sm:text-base">{site.name}</span>
																		{#if site.depth}
																			<span class="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-0">sügavus {site.depth}</span>
																		{/if}
																	</div>
																</div>
															</div>
															{#if site.special}
																<Badge variant="destructive" class="text-xs ml-2 flex-shrink-0">
																	Eriluba
																</Badge>
															{/if}
														</div>
														{#if site.note}
															<div class="ml-4 text-xs sm:text-sm text-amber-700 italic leading-relaxed">
																<strong>NB!</strong> {site.note}
															</div>
														{/if}
													</li>
												{/each}
											</ul>
										</div>
									</div>
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				</div>

				<!-- Important Notice -->
				<div class="p-4 sm:p-6 bg-amber-50 border border-amber-200 rounded-xl">
					<div class="flex items-start space-x-3">
						<div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
							<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-amber-800 mb-2 text-sm sm:text-base">Oluline teave</h4>
							<p class="text-amber-700 leading-relaxed text-sm sm:text-base">
								Meresukeldumised nõuavad vastavat kogemust ja väljaõpet. Palun järgige alati ohutusreegleid ja sukelduge ainult oma oskuste piirides. Muinsuskaitsealustel objektidel sukeldumine nõuab eriloabl. Arvestage, et merevee temperatuur võib olla madal isegi suvel.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Sidebar -->
			<div class="lg:sticky lg:top-28 space-y-4 sm:space-y-6 h-fit">
				<!-- Question Section -->
				<div class="bg-gradient-to-br from-slate-50 to-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200">
					<h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{sidebarConfig.questionSection.title}</h3>
					<p class="text-gray-600 text-sm mb-4 sm:mb-5">{sidebarConfig.questionSection.description}</p>
					
					<h4 class="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">{sidebarConfig.contactSection.title}</h4>
					
					<div class="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
						<div class="flex items-start text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
								<MapPin class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium leading-relaxed">{sidebarConfig.contactSection.address}</span>
						</div>
						
						<div class="flex items-center text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
								<Clock class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.hours}</span>
						</div>
						
						<div class="flex items-center text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
								<Phone class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.phone}</span>
						</div>
						
						<div class="flex items-start text-gray-600">
							<div class="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
								<Mail class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium break-all">{sidebarConfig.contactSection.email}</span>
						</div>
					</div>

					<!-- CTA Button -->
					<Button 
						class="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-10 sm:h-12 text-sm font-medium"
						onclick={() => window.location.href = sidebarConfig.ctaButton.link}
					>
						{sidebarConfig.ctaButton.text}
					</Button>
				</div>

				<!-- Images Section -->
				{#if sidebarConfig.images && sidebarConfig.images.length > 0}
					<div class="space-y-3 sm:space-y-4">
						{#each sidebarConfig.images as image}
							<div class="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100">
								<img 
									src={image} 
									alt="Sukeldumise pilt"
									class="w-full h-40 sm:h-48 object-cover"
								/>
								<!-- Bottom CTA -->
								<div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
									<Button 
										class="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300"
										onclick={() => window.location.href = sidebarConfig.imageCtaButton.link}
									>
										<Calendar class="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
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
