<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';
	import { Phone, Mail, MapPin, Clock, Calendar, AlertTriangle, Info } from 'lucide-svelte';

	// Page data configuration - customize for each page
	const pageData = {
		title: 'Tehniline sukeldumine',
		subtitle: 'Avasta sukeldumise uusi võimalusi sügavamatel vetel ja keerukamates tingimustes',
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

				<!-- Content goes here -->
				<div class="space-y-12">
					<!-- Add your page-specific content here -->
					
					<div class="space-y-8">
						<h2 class="text-3xl font-bold text-gray-900">Tehniline sukeldumine – mis see on?</h2>
						
						<div class="space-y-6 text-gray-700 leading-relaxed">
							<p>
								Mõned vastaksid selliselt, et tehniline sukeldumine on tavapärase hobisukeldumise piiridest väljaspool toimuv sukeldumine. Hobisukeldumiseks peetakse sukeldumisringkondades üldiselt sukeldumist kuni 40 meetri sügavusse ja selliselt, et loomulik valgus alati näha oleks kui kuhugi sisse lähed. Muuhulgas, mõni aeg tagasi loeti ka rikastatud õhu (EANx) kasutamist tehniliseks sukeldumiseks. Tänasel hetkel on EANx laialt kasutatav. Sama kehtib ka varustuse kohta. Kui mõni aeg tagasi olid nn tiibvestid üksnes tehnilistel sukeldujatel, siis käesoleval hetkel on "tiivad" laialdaselt kasutusel. Hobisukelduja varustusest rääkides käib jutt konfiguratsioonist üks balloon, üks regulaator ja vest.
							</p>

							<Alert class="border-blue-200 bg-blue-50">
								<Info class="h-4 w-4 text-blue-600" />
								<AlertDescription class="text-blue-800">
									<strong>Tehniline sukeldumine</strong> tähendab muuhulgas ka sukeldumist sügavamale kui 40 meetrit, kohustuslike dekompressioonipeatusi tõusmisel pinnale, sukeldumist ilma otsetõusu võimaluseta veepinnale, kiirendatud dekompressiooni gaasivahetusega ning hingamisgaaside vahetamist vee all jpm. Tehnilise sukeldumise mõiste võiks kokku võtta järgmiselt: <em>tehniline sukeldumine on teadmiste, oskuste ja kogemuste kogum, mis tagab sukeldumise turvalisuse.</em>
								</AlertDescription>
							</Alert>

							<p>
								Tehniline sukeldumine on siiski kogu sukeldumismaastikul suhteliselt väike osa, mis on väljapaistev oma kõlavate saavutuste tõttu. Samuti saab väita, et tehniline sukeldumine on viimastel aastatel jõudsalt kasvanud ning üle maailma on lisandunud uusi sukeldujaid, kes on pühendunud tehnilisele sukeldumisele – mis on nende hobiks!
							</p>

							<Alert class="border-orange-200 bg-orange-50">
								<AlertTriangle class="h-4 w-4 text-orange-600" />
								<AlertDescription class="text-orange-800">
									<strong>Oluline teada:</strong> Tehniline sukeldumine pole kõigi jaoks. Kõik ei pea sellele teele asuma. Tehniline sukeldumine eeldab pühendumist, head füüsilist vormi ja õiget suhtumist. Kuivõrd tehnilise sukeldumise sügavuse lähevad tõenäoliselt üle hobisukeldumise 40 meetri piiri on oluline distsipliin ja reeglitest kinnipidamine.
								</AlertDescription>
							</Alert>

							<p>
								Sügavuste alistamine toimub samm sammult, sõltuvalt sukelduja ettevalmistusest ja kogemustest.
							</p>

							<h3 class="text-2xl font-bold text-gray-900 pt-6">Hingamissegud ja varustus</h3>

							<p>
								Tehnilises sukeldumises ei kasutata hingamiseks ainult õhku. Lisaks õhule kasutatakse erinevate gaaside segusid. Näiteks trimix (hapniku, lämmastiku, heeliumi segu), heliox (heeliumi ja hapniku segu), heliair (heeliumi ja õhu segu), EANx (sh kangem kui 40%) rääkimata. Missugust hingamissegu parasjagu kasutatakse, sõltub konkreetsest sukeldumisest. Sügavustega kaasnevad kohustuslikud dekompressioonipeatused, kus kasutatakse hingamissegusid, et optimeerida dekompressiooniks kuluvat aega. Üldjuhul on tegemist erinevate EANx hingamissegudega kuni 100%lise hapnikuni.
							</p>

							<p>
								Varustus, mida tehnilises sukeldumises kasutatakse erineb tavapärasest varustusest ja sõltub eelkõige sukeldumise eesmärgist. Standardiks on saanud rakmetega metallplaati ja sellele kinnitatud sobiva tõstejõuga "tiib", mis on dubleeritud st, et lisaks on tõstekott ja/või kuiv ülikond. Regulaatorid on dubleeritud ja nende koostamise skeem on ka tavapärasest erinev.
							</p>

							<h3 class="text-2xl font-bold text-gray-900 pt-6">Kas tehniline sukeldumine on sinu jaoks?</h3>

							<p>
								Kui hakkasid nüüd arvama, et tehniline sukeldumine on sinu jaoks – mõtle hoolega, kas Sul on piisavalt aega, et pühenduda? Äkki siiski pole?
							</p>

							<Alert class="border-green-200 bg-green-50">
								<Info class="h-4 w-4 text-green-600" />
								<AlertDescription class="text-green-800">
									<strong>Oled valmis alustama?</strong> Kui nüüd ka vastuseks JAH! said, siis alusta enese koolitamisega. Teadmised ja oskused on vundament, millele ehitada üle rikkalik kogemuste pagas. Sukeldumine on praktiline ala, kirjutuslaua taga heaks sukeldujaks ei saa!
								</AlertDescription>
							</Alert>
						</div>
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
