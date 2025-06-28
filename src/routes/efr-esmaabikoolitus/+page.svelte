<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import * as Table from '$lib/components/ui/table';
	import { Phone, Mail, MapPin, Clock, Calendar, Info, Users } from 'lucide-svelte';

	// Page data configuration - customize for each page
	const pageData = {
		title: 'EFR Esmaabikoolitus',
		subtitle: 'NDL ja PADI organisatsioonide esmaabikursused vastavusse viidud Eesti Punase Risti esmaabi põhikursusega',
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

				<!-- Intro Section -->
				<div class="space-y-8">
					<h2 class="text-3xl font-bold text-gray-900 mb-6">Esmaabikursused</h2>
					
					<p class="text-lg text-gray-700 leading-relaxed">
						Korraldame <strong>NDL</strong> ja <strong>PADI</strong> organisatsioonide esmaabikursuseid, 
						mis on vastavusse viidud Eesti Punase Risti poolt koostatud esmaabi põhikursusega ning 
						aluseks on EV sotsiaalministeeriumi määrus nr 80 (14.12.2000) 
						<a href="http://lex.andmevara.ee/estlex/kehtivad/AktDisplay.jsp?id=39214&akt_id=39214" 
						   class="text-orange-600 hover:text-orange-700 underline" target="_blank">
							"Töötervishoiu ja tööohutusalase väljaõppe ja täiendõppe kord"
						</a> 
						ning sotsiaalministeeriumi määrus nr 63 (19.06.2001) "Nõuded mootorsõidukijuhi esmaabialasele väljaõppele".
					</p>
					
					<p class="text-lg text-gray-700 leading-relaxed">
						Lisaks sellele, et esmaabikursused on huvitavad ja vajalikud meile kõigile, võivad kursusel 
						saadud oskused olla otsustava tähtsusega nii mõneski olukorras! Kursus lõpeb osalejate 
						teadmiste kontrolliga, mille läbimist kinnitab väljastatud tunnistus ja rahvusvahelise 
						kehtivusega sertifikaat.
					</p>
				</div>

				<!-- Course Content -->
				<div class="space-y-8">
					<h2 class="text-3xl font-bold text-gray-900">Esmaabiandjate väljaõppe 16-tunnine õppekava</h2>
					
					<p class="text-lg text-gray-700 leading-relaxed">
						Kursus koosneb kahest osast: <strong>Esmane abistamine</strong> ja <strong>teisejärguline abistamine</strong>
					</p>

					<div class="grid md:grid-cols-2 gap-8">
						<div class="space-y-4">
							<h3 class="text-xl font-semibold text-gray-900">Esimene osa sisaldab:</h3>
							<ul class="space-y-2 text-gray-700">
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Sündmuskoha hindamist
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Kaitsevahendite kasutamist
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Esmast kannatanu seisundi hindamist
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Kunstlikku hingamist
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Ühe päästjaga kaudne südamemassaž täiskasvanule
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Tõsiste verejooksude peatamine
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Šoki vältimine ja kontrolli all hoidmine
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Käitumine selgroovigastuste puhul
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Lämbuva täiskasvanu abistamine
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Esmaabi hapniku võimaldamine
								</li>
							</ul>
						</div>

						<div class="space-y-4">
							<h3 class="text-xl font-semibold text-gray-900">Teine osa sisaldab:</h3>
							<ul class="space-y-2 text-gray-700">
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Vigastuste hindamist
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Haiguse hindamist
								</li>
								<li class="flex items-start">
									<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
									Sidumist ja nihestuste ning luumurdude lahastamist
								</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Course Format -->
				<div class="space-y-6">
					<h3 class="text-2xl font-bold text-gray-900">Kursusel õpitu kontrollimine</h3>
					<p class="text-gray-700 leading-relaxed">
						Iga teema kohta vaadatakse kursusel videot, kuulatakse loengut ning praktiseeritakse 
						instruktori juhendamisel. Kõik saavad olla kannatanud, abiandjad.
					</p>
				</div>

				<!-- Course Structure -->
				<div class="bg-gray-50 rounded-lg p-6 space-y-6">
					<h3 class="text-2xl font-bold text-gray-900">Kursuse ülesehitus</h3>
					<p class="text-gray-700">
						Vastavalt EV Sotsiaalministeeriumi määrusele on alates 2010 aastast muutunud esmaabikoolituse läbiviimise kord.
					</p>
					<p class="text-gray-700 font-medium">16-tunnine esmaabikoolitus koosneb:</p>
					<ul class="space-y-2 text-gray-700">
						<li class="flex items-start">
							<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
							<span><strong>6 akadeemilist tundi</strong> iseseisvat tööd – teoreetilise materjali õppimine</span>
						</li>
						<li class="flex items-start">
							<span class="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
							<span><strong>10 akadeemilist tundi</strong> auditoorset tööd, mis sisaldab teoreetilist ja praktilist osa</span>
						</li>
					</ul>
				</div>

				<!-- Practical Info -->
				<div class="space-y-6">
					<h3 class="text-2xl font-bold text-gray-900">Praktiline info</h3>
					
					<div class="space-y-4">
						<Alert.Root>
							<Users class="h-4 w-4" />
							<Alert.Title>Lisainfo</Alert.Title>
							<Alert.Description>
								Kursust võib tellida ka firmasisese koolitusena (miinimum osalejate arv 6 in). 
								Grupi optimaalne suurus on 10 inimest.
							</Alert.Description>
						</Alert.Root>
						
						<Alert.Root>
							<Clock class="h-4 w-4" />
							<Alert.Title>Kursuse kestus</Alert.Title>
							<Alert.Description>
								16 akadeemilist tundi
							</Alert.Description>
						</Alert.Root>
						
						<Alert.Root>
							<MapPin class="h-4 w-4" />
							<Alert.Title>Aeg ja koht</Alert.Title>
							<Alert.Description>
								Kursuse toimumise aeg ja koht on kokkuleppel Teiega!
							</Alert.Description>
						</Alert.Root>
					</div>
				</div>

				<!-- Pricing -->
				<div class="space-y-4">
					<h3 class="text-2xl font-bold text-gray-900">Hinnad</h3>
					<div class="border rounded-lg">
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head class="border-b">Sertifikaadi tüüp</Table.Head>
									<Table.Head class="border-b">Hind</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Table.Row>
									<Table.Cell class="font-medium border-b">NDL MFA või PADI EFR litsents</Table.Cell>
									<Table.Cell class="border-b">65 EUR</Table.Cell>
								</Table.Row>
								<Table.Row>
									<Table.Cell class="font-medium">EV Sotsiaalministeeriumi määrusele vastav tunnistus</Table.Cell>
									<Table.Cell>55 EUR</Table.Cell>
								</Table.Row>
							</Table.Body>
						</Table.Root>
					</div>
					<p class="text-sm text-gray-600">* Gruppidele hinnasoodustus</p>
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
