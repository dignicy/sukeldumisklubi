<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCaption,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import {
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger
	} from '$lib/components/ui/tabs';
	import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-svelte';

	// Page data configuration
	const pageData = {
		title: 'Sukeldumisvarustuse rent',
		subtitle:
			'Kvaliteetne ja tänapäevane sukeldumisvarustus rendiks. Kõik varustusega seonduv saab selgeks juba baaskoolitusel.',
		heroImage: '/photos/varustus.png'
	};

	// Rental equipment pricing data
	const rentalPricing = [
		{ id: 1, item: 'Ballooni rent õhuga', price: '10,00 €' },
		{ id: 2, item: 'Reduktor', price: '8,00 €' },
		{ id: 3, item: 'Vest', price: '8,00 €' },
		{ id: 4, item: 'Mask / Snorkel', price: '4,00 €' },
		{ id: 5, item: 'Lestad', price: '5,00 €' },
		{ id: 6, item: 'Pikk ülikond', price: '8,00 €' },
		{ id: 7, item: 'Lühike ülikond', price: '5,00 €' },
		{ id: 8, item: 'Raskusvöö/raskused', price: '5,00 €' },
		{ id: 9, item: 'Raskused', price: '3,00 €' },
		{ id: 10, item: 'Saapad', price: '5,00 €' },
		{ id: 11, item: 'Kindad', price: '5,00 €' },
		{ id: 12, item: 'Kompuuter', price: '10,00 €' },
		{ id: 13, item: 'Kompass', price: '5,00 €' },
		{ id: 14, item: 'Lamp', price: '5,00-10,00 €' },
		{ id: 15, item: 'Kuiv ülikond (koos alusega)', price: '35,00 €' },
		{ id: 16, item: 'Duublid', price: '16,00 €' },
		{ id: 17, item: 'Duublite komplekt regudega', price: '24,00 €' },
		{ id: 18, item: 'Stage balloon (komplekt)', price: '10,00 €' },
		{ id: 19, item: 'Tiib plaadiga', price: '12,00 €' },
		{ id: 20, item: 'Ballooni laadimine', price: '10,00 €' },
		{ id: 21, item: 'Ballooni laadimine 10 tk', price: '80,00 €' },
		{ id: 22, item: 'Nitroxi laadimine klubi liikmele/mitteliikmele', price: '12,00 €' },
		{ id: 23, item: 'Varustuse rent 24 h', price: '30,00 €' },
		{ id: 24, item: 'Varustuse komplekt 24 h koos kompuutriga', price: '40,00 €' },
		{ id: 25, item: 'Varustuse komplekt koos kompuutriga nädalavahetus, 2 ballooni', price: '60,00 €' },
		{ id: 26, item: 'Varustuse komplekt koos kompuutriga 1 nädal MM reisil', price: '70,00 €' },
		{ id: 27, item: 'Varustuse komplekt koos kompuutriga 1 nädal', price: '100,00 €' },
		{ id: 28, item: 'Varustuse pesemine', price: '15,00 €' }
	];

	// Rental conditions
	const rentalConditions = [
		'Klient on (kui mistahes osa varustusest on mõeldud akvalangisukeldumiseks) sertifitseeritud sukelduja ja/või osaleb akvalangisukeldumise kursusel/programmis kvalifitseeritud instruktori järelvalve all.',
		'Kättesaadud varustus on töökorras ja on kontrollitud õhu hulka ja kvaliteeti renditud ballooni(de)s.',
		'Renditav varustus on Sukeldumisklubi omand. Renditud varustuse müümine, edasilaenutamine, -rentimine, kasutada andmine ja igasugune vahetamine on keelatud. Klient kohustub hoolitsema renditud varustuse hea seisukorra säilimise eest ja vastutab selle eest, et renditud varustus ei saa kahjustusi ega lähe kaduma.',
		'Keelatud on eemaldada ja/või vahetada komplekti kuuluvat varustust. Klient on kohustatud hüvitama Sukeldumisklubile renditud varustuse rikkumise või kadumise korral allpool toodud korras.',
		'Renditud varustuse varastamisel või kaotamisel peab klient teatama koheselt nii politseile kui varustuse väljarentinud ettevõttele. Renditud varustuse varguse või kadumise korral kantakse võimalik kindlustushüvitis üle varustuse väljarentinud ettevõttele.',
		'Rendivarustus tuleb tagastada lepingus märgitud ajaks või pikendatud tähtajaks. Kui renditud varustus ei ole tähtajaks tagastatud nõutakse kliendilt sisse hüvitis hilinetud päevade (päeva osa arvestatakse täispäevana) laenutasu suuruses summas, koos muu võimaliku kahjutasuga, kuid mitte enam kui 10 päeva eest. 10 päeva möödumisel nõutakse kahjutasu nagu hävinenud varustuse eest.',
		'Sukeldumisklubil on õigus katkestada rendileping koheselt kui selgub et: klient on andnud valeandmed rendilepingusse kandmiseks, klient ei maksa renditasu õigeaegselt, ei hoolitse renditud varustuse säilimise eest, kasutab rendi varustust lepingutingimusi eirates või rikub muul moel käesolevat lepingut.',
		'Sukeldumisklubil on õigus nõuda kliendilt kulude ja kahju hüvitamist tema süül tekkinud kahju eest. Kui renditud varustus on hävinenud või seda ei saa muul põhjusel tagastada, on klient kohustatud hüvitama varustuse hinna vastavalt Sukeldumisklubi hinnakirjale.'
	];

	// Sidebar configuration
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
<section class="relative flex items-center justify-center overflow-hidden bg-white py-2 sm:py-4 px-2 sm:px-4 h-[300px] sm:h-[400px] md:h-[500px]">
	<div class="relative w-full max-w-screen bg-black rounded-2xl sm:rounded-3xl overflow-hidden h-full">
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
		<div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-10">
			<div class="max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
				<div class="max-w-4xl">
					<h1 class="text-3xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight">
						{pageData.title}
					</h1>
					
					<p class="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-2xl lg:max-w-3xl leading-relaxed">
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
					<h2 class="text-3xl font-bold text-gray-900">Sukeldumisvarustuse rent</h2>
					<div class="space-y-4 text-lg text-gray-600">
						<p>
							Inimene ei suuda sarnaselt kaladele vee all hingata, selleks vajame vastavat lisavarustust. 
							Tänapäevane sukeldumisvarustus on lihtne ja töökindel ning kõik varustusega seonduv saab 
							selgeks juba baaskoolitusel. Varustust tehakse vastavalt kõikidele mõõtudele ja vajadustele – 
							nii lastele, kui erivajadustega inimestele.
						</p>
						<p>
							Varustuse soetamisel soovitame nõu küsida oma instruktorilt või konsulteerida meie kaupluse 
							müüjatega, kes kõik on oma ala professionaalid ning alati valmis sind otsuste tegemisel toetama.
						</p>
						<p class="text-base">
							Vaata lisa ka meie internetipoest 
							<a href="https://www.divedepo.com" target="_blank" rel="noopener noreferrer" 
							   class="font-medium text-orange-600 hover:text-orange-700 underline">
								www.divedepo.com
							</a>
						</p>
					</div>
				</div>

				<!-- Tabs Section -->
				<div class="space-y-8">
					<Tabs value="rent" class="w-full">
						<TabsList class="grid w-full grid-cols-2">
							<TabsTrigger value="rent">Rent</TabsTrigger>
							<TabsTrigger value="conditions">Varustuse rentimise tingimused</TabsTrigger>
						</TabsList>

						<!-- Rental Pricing Tab -->
						<TabsContent value="rent" class="space-y-6">
							<div class="space-y-4">
								<p class="text-gray-600">
									Sukeldumisklubi renditav sukeldumisvarustus on klubi omand. Omalt poolt 
									uuendame oma rendivarustust pidevalt. Meie renditavad balloonid läbivad survetesti 
									ja puhtuse kontrolli nii reeglite järgi kehtestatud ajal, kui ka pisteliselt. 
									Meie kompressor on alati õigeaegselt hooldatud.
								</p>
								<p class="text-gray-600">
									Renditud varustuse müümine, edasilaenutamine, -rentimine, kasutada andmine ja 
									igasugune vahetamine on keelatud. Palume kasutada rendivarustust heaperemehelikult, 
									nii nagu see oleks Teie enda oma, siis on nii Teil kui järgmisel kliendil võtta 
									kasutusse puhas, terve ja hästi töötav varustus.
								</p>
							</div>

							<div class="space-y-4">
								<h3 class="text-2xl font-bold text-gray-900">Rendivarustuse hinnakiri</h3>
								
								<div class="rounded-xl border border-gray-200 overflow-hidden">
									<Table>
										<TableHeader>
											<TableRow class="bg-gray-50">
												<TableHead class="w-20 font-semibold">Jrk.nr.</TableHead>
												<TableHead class="font-semibold">Nimetus</TableHead>
												<TableHead class="text-right font-semibold w-40">Hind</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{#each rentalPricing as item}
												<TableRow class="hover:bg-gray-50">
													<TableCell class="font-medium text-gray-600">{item.id}</TableCell>
													<TableCell>{item.item}</TableCell>
													<TableCell class="text-right">
														<Badge variant="secondary" class="bg-orange-100 text-orange-800 font-semibold">
															{item.price}
														</Badge>
													</TableCell>
												</TableRow>
											{/each}
										</TableBody>
									</Table>
								</div>
							</div>
						</TabsContent>

						<!-- Rental Conditions Tab -->
						<TabsContent value="conditions" class="space-y-6">
							<div class="space-y-4">
								<h3 class="text-2xl font-bold text-gray-900">Varustuse rentimise tingimused</h3>
								<div class="space-y-4">
									{#each rentalConditions as condition, index}
										<div class="flex gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
											<div class="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600 flex-shrink-0 mt-0.5">
												{index + 1}
											</div>
											<p class="text-gray-700 leading-relaxed">{condition}</p>
										</div>
									{/each}
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</div>

				<!-- Additional Info -->
				<div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-blue-50 p-6">
					<h3 class="text-xl font-bold text-gray-900 mb-3">Oluline teada</h3>
					<p class="text-gray-700">
						Kui soovite rendilepingut pikendada, tuleb see kooskõlastada Sukeldumisklubiga enne 
						renditähtaja möödumist. Meie kogemusnõustajad aitavad valida teile sobiva varustuse 
						ja annavad vajalikke juhiseid kasutamiseks.
					</p>
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
