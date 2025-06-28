<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-svelte';

	// Template configuration - easily customizable
	const pageTitle = 'Korduma Kippuvad Küsimused';
	const pageSubtitle = 'Vastused kõige sagedamatele küsimustele sukeldumise kohta';
	const heroImage = '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
	
	const introText = `Siin leiad vastused kõige sagedamatele küsimustele sukeldumise kohta. Kui sul on veel küsimusi, võta meiega julgesti ühendust.`;

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

	const contentSections = [
		{
			title: 'Kas ma sobin sukelduma?',
			content: `Selleks, et seda teada saada tuleks sooritada proovisukeldumine. Esimene asi mis võib tunduda keerulisena on kõrvade tasakaalustamine. Sukeldumine – see pole VÕITLUS kõrvavaluga. Kõvem sukelduja pole see, kes suudab rohkem valu kannatada. Tegelikult sukeldudes ei tohi valu üldse tunda. Esiteks, sukeldumine on ja peab olema lõbus ja teiseks on valu tekkimine ohtlik. Sukeldumiskursusel õpetetakse sulle kindlasti kuidas kõrvades rõhku tasakaalustada nii, et valus poleks.`
		},
		{
			title: 'Kas tehakse spetsiaalseid sukeldumismaske prillikandjatele?',
			content: `Jah, mitmetele maskitüüpidele on võimalik tellida optilisi klaase. Telli endale koos maskiga kohe optilised klaasid või vali mask nende tüüpide hulgast, millele saad tulevikus eraldi optilised klaasid tellida.`
		},
		{
			title: 'Millest peaksin alustama kui sooviksin sukeldumisinstruktoriks õppida?',
			content: `Tore, et tunned huvi töö vastu sukeldumisinstruktorina. Või isegi kui sa ei tunne huvi töö vastu siis vähemalt õppimise. Sukeldumisinstruktoriks saamiseks polegi tegelikult vaja rohkem teha kui alustada algusest: PADI Open Water Diver või mõne teise sukeldumisorganisatsiooni algkursus – see on algajate kursus, millest kõik pihta hakkab. Edasi Advanced Open Water Diver, siis Rescue Diver. See on ka peaaegu kõrgeim tase sukeldujatele, kes tahavad selle asja omale hobiks jätta. Tegelikult on kõrgeim tase PADI Master Scuba Diver. See on aunimetus, mille saad kui oled läbinud OWD, AOWD, esmaabi-, Rescue kursused ja viis sukeldumise erialakursust. Rescue Diver saab asuda Divemasteri kursusele. Divemaster – see on sukeldumisgiid, rühmajuht, instruktori abiline koolitustel ja sukeldujate abimees nende sukeldumiselus. Divemasterist edasi tulebki Instructor Development Course (IDC). IDC koosneb tegelikult neljast faasist: iseseisvast õppimisest, Assistant Instructori ja Open Water Scuba Instructori kursusest ja Instuktori Eksamist. Neid osasid võib tehe eraldi või koos. Harilikult tehakse pigem koos.`
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

				<!-- Content Sections -->
				<div class="space-y-12">
					{#each contentSections as section, index}
						<div class="border-l-4 border-orange-500 pl-6 py-4">
							<h3 class="text-xl font-bold text-gray-900 mb-4">
								{index + 1}. {section.title}
							</h3>
							<p class="text-lg text-gray-700 leading-relaxed">
								{section.content}
							</p>
						</div>
					{/each}
				</div>

				<!-- Important Notice -->
				<div class="p-6 bg-blue-50 border border-blue-200 rounded-xl">
					<div class="flex items-start space-x-3">
						<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
							<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-blue-800 mb-2">Veel küsimusi?</h4>
							<p class="text-blue-700 leading-relaxed">
								Kui siit ei leidnud vastust oma küsimusele, võta meiega julgesti ühendust. Meie kogenud instruktorid on alati valmis sind aitama!
							</p>
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
