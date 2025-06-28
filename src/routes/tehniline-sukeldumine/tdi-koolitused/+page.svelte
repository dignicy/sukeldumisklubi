<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion';
	import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-svelte';

	// Page data configuration - customize for each page
	const pageData = {
		title: 'TDI Koolitused',
		subtitle:
			'Technical Diving International koolitused kõrgeimate standardite järgi sertifitseeritud instruktorite poolt.',
		heroImage: '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp'
	};

	// Course data
	const courses = [
		{
			id: 'deep-diver',
			title: 'Sügavsukelduja kursus (Deep Diver)',
			price: '165 EUR',
			description:
				'Eesmärk: kursuse läbimine annab põhjalikud teadmised ja oskused sukeldumiseks õhuga kuni 39 meetri sügavusele ja on eelduseks edasiste kursuste läbimisel. Kursus keskendub sügavsukeldumise planeerimisele, varustuse valikule ja vajalike oskuste harjutamisele.',
			requirements:
				'AOWD sertifikaat, vähemalt 10 logitud sukeldumist, minimaalne vanus 15 eluaastat.',
			content:
				'nelja tunnine teoorialoeng, vähemalt üks basseinitreening ning minimaalselt neli avaveesukeldumist, millest kaks vähemalt 30 meetri sügavusele. Sügavsukelduja kursust võib kombineerida Advanced Nitrox Sukelduja kursusega.'
		},
		{
			id: 'advanced-nitrox',
			title: 'Advanced Nitrox Sukelduja',
			price: '325 EUR',
			description:
				'Eesmärk: kursuse läbimine annab põhjalikud teadmised ja oskused Nitroxi segude EANx 21%-50% kasutamisest hobisukeldumises. Kursuse edukalt läbinu oskab valida vajaliku varustuse lahenduse tulenevalt sukeldumise eesmärgist ja objektist. Oskab planeerida sukeldumisi sügavusele kuni 42 meetrit ja tunneb dekompressiooni protseduuri aluseid.',
			requirements:
				'EANx Diver, AOWD ja IANTD Deep Diver sertifikaat ning vähemalt 30 logitud sukeldumist. Minimaalne vanus 15 eluaastat.',
			content:
				'Kursus koosneb ca 16 tunnisest teoorialoengust, basseini- ja avaveepraktikast. Basseinipraktika käigus õpitakse lahendama erinevaid ohuolukordasid ja varustuse kasutamist. Kursuse raames tehakse vähemalt kuus avaveesukeldumist, millest kolm sügavamale kui 30 meetrit'
		},
		{
			id: 'technical-diver',
			title: 'Tehniline Sukelduja',
			price: '485 EUR',
			description:
				'Eesmärk: kursuse läbimine annab teadmised ja oskused sukeldumiseks kuni 54 meetri sügavusele. Kursuse läbinu oskab kasutada, tulenevalt sukeldumise eesmärgist ja kestvusest, EANx hingamisgaase põhjaseguna. Dekompressiooni seguna õpitakse kasutama rikastatud õhku kuni puhta hapnikuni ning tundma dekompressiooni protseduuri.',
			requirements:
				'Advanced EANx Sukelduja sertifikaat, vähemalt 100 logitud sukeldumist, millest 30 on sügavamale kui 27 meetrit. Minimaalne vanus 18 aastat.',
			content:
				'Kursus koosneb ca 12 tunnisest teoorialoengust, basseini- ja avaveepraktikast. Basseinipraktika käigus õpitakse lahendama erinevaid ohuolukordasid ja varustuse kasutamist. Kursuse raames tehakse vähemalt neli avaveesukeldumist, millest kaks sügavamale kui 39 meetrit.'
		},
		{
			id: 'normoxic-trimix',
			title: 'Normoxic Trimix Sukelduja',
			price: '485 EUR',
			description:
				'Eesmärk: kursuse läbimine annab teadmised ja oskused sukeldumiseks kuni 60 meetri sügavusele. Kursuse läbinu oskab kasutada põhjaseguna heeliumi baasil normoksilisi Trimix hingamissegusid. Dekompressioonigaasina kasutatakse erinevaid EANx segusid kuni 100%-lise hapnikuni ning õpitakse tundma dekompressiooni protseduure.',
			requirements:
				'Advanced EANx Sukelduja ja Tehnilise Sukelduja sertifikaat, vähemalt 100 logitud sukeldumist, millest 30 on sügavamale kui 27 meetrit. Minimaalne vanus 18 aastat.',
			content:
				'Kursus koosneb teooraloengust ca 12 tundi, basseini- ja avaveepraktikast. Basseinipraktika käigus õpitakse lahendama erinevaid ohuolukordasid ja varustuse kasutamist. Kursuse raames tehakse vähemalt neli avaveesukeldumist, millest üks sügavamale kui 39 meetrit ja üks sügavusele 54 meetrit.'
		}
	];

	// Combo packages
	const comboPackages = [
		{
			title: 'Tehniline + Normoxic Trimix Sukelduja kursus koos',
			price: '850 EUR'
		},
		{
			title: 'Sügavsukelduja (Deep Diver) + Advanced Nitrox Sukelduja kursus koos',
			price: '350 EUR'
		}
	];

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
		images: ['/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp'],
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
<section
	class="relative flex h-[400px] items-center justify-center overflow-hidden bg-white px-4 py-4 md:h-[500px]"
>
	<div class="max-w-screen relative h-full w-full overflow-hidden rounded-3xl bg-black">
		<!-- Background -->
		<div class="absolute inset-0 z-0">
			<img
				src={pageData.heroImage}
				alt={pageData.title}
				class="h-full w-full object-cover"
				loading="eager"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>

		<!-- Content Overlay -->
		<div class="absolute bottom-0 left-0 right-0 z-10 p-8">
			<div class="mx-auto max-w-7xl px-6">
				<div class="max-w-4xl">
					<h1 class="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
						{pageData.title}
					</h1>

					<p class="max-w-3xl text-xl text-blue-100">
						{pageData.subtitle}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Main Content -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-16 lg:grid-cols-3">
			<!-- Main Content -->
			<div class="space-y-16 lg:col-span-2">
				<!-- Intro Section -->
				<div class="space-y-6">
					<h2 class="text-3xl font-bold text-gray-900">TDI Tehnilise Sukeldumise Kursused</h2>
					<p class="text-lg text-gray-600">
						Technical Diving International (TDI) on maailma suurim tehnilise sukeldumise
						koolitusorganisatsioon. Meie TDI kursused viiakse läbi kogenud ja sertifitseeritud
						instruktorite poolt, kes tagavad kõrgeima kvaliteedi ja ohutuse.
					</p>
				</div>

				<!-- Courses Accordion -->
				<div class="space-y-8">
					<h3 class="text-2xl font-bold text-gray-900">Saadaolevad kursused</h3>

					<Accordion type="multiple" class="w-full space-y-4">
						{#each courses as course}
							<AccordionItem
								value={course.id}
								class="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
							>
								<AccordionTrigger class="text-left">
									<div class="mr-4 flex w-full items-center justify-between">
										<h4 class="text-xl font-semibold text-gray-900">{course.title}</h4>
										<Badge variant="secondary" class="bg-orange-100 font-semibold text-orange-800">
											{course.price}
										</Badge>
									</div>
								</AccordionTrigger>
								<AccordionContent class="pt-4">
									<div class="space-y-4 text-gray-600">
										<p class="text-base leading-relaxed">{course.description}</p>

										<div class="space-y-2">
											<h5 class="font-semibold text-gray-900">Eeldused kursusele pääsemiseks:</h5>
											<p class="text-sm">{course.requirements}</p>
										</div>

										<div class="space-y-2">
											<h5 class="font-semibold text-gray-900">Kursuse sisu:</h5>
											<p class="text-sm">{course.content}</p>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						{/each}
					</Accordion>
				</div>

				<!-- Combo Packages -->
				<div class="space-y-6">
					<h3 class="text-2xl font-bold text-gray-900">Kombo-paketid</h3>
					<div
						class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-blue-50 p-6"
					>
						<div class="space-y-4">
							{#each comboPackages as combo}
								<div
									class="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
								>
									<span class="font-medium text-gray-900">{combo.title}</span>
									<Badge class="bg-orange-500 font-semibold text-white">
										{combo.price}
									</Badge>
								</div>
							{/each}
						</div>
					</div>
				</div>

			</div>

			<!-- Sidebar -->
			<div class="h-fit space-y-6 lg:sticky lg:top-28">
				<!-- Question Section -->
				<div
					class="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-orange-50 p-6"
				>
					<h3 class="mb-3 text-xl font-bold text-gray-900">
						{sidebarConfig.questionSection.title}
					</h3>
					<p class="mb-5 text-sm text-gray-600">{sidebarConfig.questionSection.description}</p>

					<h4 class="mb-4 text-lg font-bold text-gray-900">{sidebarConfig.contactSection.title}</h4>

					<div class="mb-6 space-y-3">
						<div class="flex items-center text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100">
								<MapPin class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.address}</span>
						</div>

						<div class="flex items-center text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100">
								<Clock class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.hours}</span>
						</div>

						<div class="flex items-center text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100">
								<Phone class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.phone}</span>
						</div>

						<div class="flex items-center text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100">
								<Mail class="h-3 w-3 text-orange-600" />
							</div>
							<span class="text-sm font-medium">{sidebarConfig.contactSection.email}</span>
						</div>
					</div>

					<!-- CTA Button -->
					<Button
						class="h-12 w-full rounded-xl bg-orange-500 text-sm font-medium text-white hover:bg-orange-600"
						onclick={() => (window.location.href = sidebarConfig.ctaButton.link)}
					>
						{sidebarConfig.ctaButton.text}
					</Button>
				</div>

				<!-- Images Section -->
				{#if sidebarConfig.images && sidebarConfig.images.length > 0}
					<div class="space-y-4">
						{#each sidebarConfig.images as image}
							<div class="relative overflow-hidden rounded-2xl bg-gray-100">
								<img src={image} alt="Sukeldumise pilt" class="h-48 w-full object-cover" />
								<!-- Bottom CTA -->
								<div class="absolute bottom-4 left-4 right-4">
									<Button
										class="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30"
										onclick={() => (window.location.href = sidebarConfig.imageCtaButton.link)}
									>
										<Calendar class="mr-2 h-4 w-4" />
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
