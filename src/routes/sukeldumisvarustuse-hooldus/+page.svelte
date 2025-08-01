<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from '$lib/components/ui/accordion';
	import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-svelte';

	// Page data configuration
	const pageData = {
		title: 'Sukeldumisvarustuse hooldus',
		subtitle:
			'Professionaalne sukeldumisvarustuse hooldus ja remont. Kõik varustusega seonduv saab selgeks juba baaskoolitusel.',
		heroImage: '/photos/varustus.png'
	};

	// Maintenance equipment pricing data
	const maintenancePricing = [
		{ id: 1, item: 'Regulaatori I ja II aste, octo hooldus, lisanduvad rem.kit. hinnad', price: '35 €' },
		{ id: 2, item: 'Octo hooldus, lisandub rem.kit. hind', price: '15 €' },
		{ id: 3, item: 'Regulaatori ja octo pesu ultraheli pesuriga', price: '10 €' },
		{ id: 4, item: 'Kuiva ülikonna kaelamanseti vahetus', price: 'Latex 48 € / Neopreen 60 €' },
		{ id: 5, item: 'Kuiva ülikonna käemansettide vahetus latex/neopreen', price: 'Latex 31 € / Neopreen 47 €' },
		{ id: 6, item: 'Kuiva ülikonna saabaste vahetus', price: 'Saabas koos tööga 85 €' },
		{ id: 7, item: 'Kuiva ülikonna luku vahetus', price: 'Metall 70 € / Plastik 80 € + luku hind' },
		{ id: 8, item: 'Kuiva ülikonna defekteerimine ja aukude parandus', price: '35 € / tund' },
		{ id: 9, item: 'BCD hooldus', price: '30 €' }
	];

	// Equipment categories for maintenance
	const equipmentCategories = [
		{
			title: 'Kalipso, saapad, kindad, kapuuts',
			subtitle: 'Neopreenist pehmed tooted',
			description: 'Nende hooldus on lihtne ja sellega saab iga sukelduja ise hakkama. Pärast sukeldumist tuleb asjad mageda veega pesta ja seejärel korralikult kuivatada. Päikese käes kuivatamine ei ole just kõige parem, seetõttu soovitame kuivatada võimalusel varjus.'
		},
		{
			title: 'BCD',
			subtitle: 'Ujuvusregulaator',
			description: 'Vajab samamoodi pesemist, aga erilist tähelepanu peab pöörama klappidele ja inflaatorile, pestes neid kindlasti voolava vee all, et soolane vesi, liiv, muda jms eemaldada. Kindlasti tuleb pärast sukeldumist BCD olev vesi sealt välja lasta.'
		},
		{
			title: 'Lestad',
			subtitle: 'Ujumislestad',
			description: 'Vajavad ainult pesemist.'
		},
		{
			title: 'Mask',
			subtitle: 'Sukeldumismask',
			description: 'Tuleb ka kindlasti loputada pärast iga sukeldumist magedas vees, aeg ajalt võiks siiski ka rohkem tähelepanu pöörata klaasi ja silikooni servadele, sinna kipub ikka mustust kogunema mis niisama maha ei lähe.'
		},
		{
			title: 'Kompuuter',
			subtitle: 'Sukeldumiskompuuter',
			description: 'Tavaliselt saab patarei tühjaks ikka siis kui olete kuhugi kaugele soojale maale sõitnud, seepärast pea meeles millal patareid vahetasid ja enneta selle tühjaks saamist kõige ebasobivamal hetkel. Kui kasutad kompuutrit kellana ja sukeldud keskmiselt või palju, siis on normaalne tööaeg 1 aasta. Patareid ära hakka ise vahetama, sest kindlasti on vaja vahetada koos patareiga ka O ringid ja teha survetest. Veekahjusid isevahetatud patareide puhul ükski tootja ei kompenseeri.'
		},
		{
			title: 'Regulaator',
			subtitle: 'Kõige tähtsamaks veealuseks abivahendiks',
			description: 'Võimalik, et seda võib lugeda kõige tähtsamaks veealuseks abivahendiks. Regulaatorite hooldus, sellele puhul kehtib reegel, hooldus tuleb teha 1 kord aastas või iga 100 sukeldumise järel.'
		}
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
					<h2 class="text-3xl font-bold text-gray-900">Sukeldumisvarustuse hooldus</h2>
					<div class="space-y-4 text-lg text-gray-600">
						<p>
							Inimene ei suuda sarnaselt kaladele vee all hingata, selleks vajame vastavat lisavarustust. 
							Tänapäevane sukeldumisvarustus on lihtne ja töökindel ning kõik varustusega seonduv saab 
							selgeks juba baaskoolitusel. Sukelduja varustust tehakse vastavalt kõikidele mõõtudele ja 
							vajadustele – nii lastele, kui erivajadustega inimestele.
						</p>
						<p>
							Sukelduja varustuse soetamisel soovitame nõu küsida oma instruktorilt või konsulteerida meie 
							kaupluse müüjatega, kes kõik on oma ala professionaalid ning alati valmis sind otsuste tegemisel toetama.
						</p>
						<p>
							Kui varustus on soetatud, siis tuleb selle eest ka hoolt kanda, et kõik asjad oleksid töökorras.
						</p>
						<p class="font-semibold text-gray-900">
							Varustuse võime jagada mitmesse kategooriasse hoolduse seisukohast:
						</p>
					</div>
				</div>

				<!-- Equipment Categories -->
				<div class="space-y-8">
					<h3 class="text-2xl font-bold text-gray-900">Varustuse kategooriad</h3>
					<Accordion type="multiple" class="w-full space-y-4">
						{#each equipmentCategories as category, index}
							<AccordionItem
								value={`category-${index}`}
								class="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
							>
								<AccordionTrigger class="text-left">
									<div class="mr-4 flex w-full items-center justify-between">
										<div>
											<h4 class="text-xl font-semibold text-gray-900">{category.title}</h4>
											<p class="text-sm text-orange-600 mt-1">{category.subtitle}</p>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent class="pt-4">
									<p class="text-gray-700 leading-relaxed">{category.description}</p>
								</AccordionContent>
							</AccordionItem>
						{/each}
					</Accordion>
				</div>

				<!-- Professional Services -->
				<div class="space-y-8">
					<h3 class="text-2xl font-bold text-gray-900">Professionaalne hooldus</h3>
					
					<div class="space-y-4 text-lg text-gray-600">
						<p>Sukeldumisklubi spetsialistid teostavad järgmisi hooldusi ja remonte:</p>
						
						<p>Regulaatorite hooldused – Meie tehnikud on õppinud Poseidoni, Marese, Aqualungi ja Apexi tehasekoolitustel ning Scubapro, Cressi ja Beuschati regude hooldust tehase korraldatud seminaridel. Regulaatorite hooldust pakuvad Peeter Vihmann, Roman Allikas, Andres Laasmaa, Olavi Helder, Mart Liiksaar.</p>
						
						<p>Kuivade ülikondade hooldust ja remonti teostavad meil Bare tehase koolituse läbinud spetsialistid. Hetkel on kõige suurem koormus Toomas Simoni õlgadel.</p>
						
						<p>Balloonide puhastamine ja survetest.</p>
					</div>

					<div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-blue-50 p-6">
						<div class="space-y-3">
							<p class="text-gray-700">
								<strong>Oluline:</strong> Regulaatorite hoolduse ja remondi hinnale lisandub kasutatavate 
								remondi komplektide hind. Kuivade ülikondade remondi hinnale vahetatavate toodete – 
								mansetid, saapad, lukud jne hinnad.
							</p>
							<p class="text-gray-700">
								Meie poole võid pöörduda iga murega, mis on tekkinud seoses varustusega, kindlasti 
								leiame Teie murele lahenduse, sest kui oma jõududega hakkama ei saa on meil alati 
								võimalik tehaste poole abi saamiseks pöörduda.
							</p>
							<p class="text-sm text-gray-600 font-medium">
								Hoolduse ja remondi hindadele lisandub käibemaks.
							</p>
						</div>
					</div>
				</div>

				<!-- Pricing Table -->
				<div class="space-y-4">
					<h3 class="text-2xl font-bold text-gray-900">Hoolduse ja remondi hinnakiri</h3>
					
					<div class="rounded-xl border border-gray-200 overflow-hidden">
						<Table>
							<TableHeader>
								<TableRow class="bg-gray-50">
									<TableHead class="w-20 font-semibold">Jrk.nr.</TableHead>
									<TableHead class="font-semibold">Nimetus</TableHead>
									<TableHead class="text-right font-semibold w-80">Hind</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{#each maintenancePricing as item}
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

				<!-- Additional Info -->
				<div class="rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-blue-50 p-6">
					<h3 class="text-xl font-bold text-gray-900 mb-3">Kvaliteetne teenindus</h3>
					<p class="text-gray-700">
						Kui toode mis on Teid ausalt aastaid teeninud, on ikkagi oma aja ära elanud ja teda 
						remontida ei ole enam mõtet, siis saate meie kaudu soodustingimustel endale uue, 
						moodsa ja kvaliteetse toote soetada.
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
