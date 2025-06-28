<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-svelte';

	// Template configuration - easily customizable
	const pageTitle = 'Sukeldumise Ohutusreeglid';
	const pageSubtitle = 'Sukeldumisklubi ja PADI ohutusreeglid';
	const heroImage = '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
	
	const introText = `Alljärgnevalt on loetletud Sukeldumisklubi ja PADI ohutusreeglid põhivarustuse- ja sukeldumisvarustusega sukeldumiseks. Lisamaks mugavust ja turvalisust sinu sukeldumisharrastusele tutvu hoolikalt reeglitega.`;

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
			title: 'Füüsiline ja vaimne seisund',
			content: `Pean hoolitsema oma hea vaimse ja füüsilise vormi eest ning vältima alkoholi ja ravimite kasutamist sukeldumisel. Ma mõistan sukeldumisalase lisakoolituse tähtsust. Pärast pikemat sukeldumispausi tuleb mul põhioskusi korrata järelvalve all.`
		},
		{
			title: 'Sukeldumispaiga tundmine',
			content: `Tunnen sukeldumispaika, kus sukeldun ja vajadusel hangin selle kohta informatsiooni kohalikult sukeldumisinstruktorilt. Kui tingimused on halvemad nendest, millega olen harjunud, pean sukeldumise edasi lükkama või siirduma paika, kus tingimused on paremad. Osalen ainult oma koolitusele ja kogemustele vastavates sukeldumistes. Kui ma pole sukeldunud üle 1 aasta pean oma teadmisi/oskusi värskendama instruktori järelvalve all.`
		},
		{
			title: 'Varustuse hooldus ja kontroll',
			content: `Kasutan alati hästi hooldatud ja usaldusväärset varustust, mida olen tundma õppinud. Sealhulgas: ujuvuskontrollivahendit (sukeldumisvest), sügavusmõõtjat, lisaõhuallikat. Enne igat sukeldumist kontrollin varustuse sobivust ja korrasolekut ning ei anna oma varustust kasutada väljaõppeta isikule.`
		},
		{
			title: 'Sukeldumiseelne nõupidamine',
			content: `Kuulan tähelepanelikult sukeldumiseelset nõupidamist ja järgin sukeldumist juhatava isiku juhiseid ja nõuandeid. Paadil on ainus vastutav isik giid/sukeldumise juhataja, ning tema juhiste järgimine on mulle kohustuslik.`
		},
		{
			title: 'Paarisukeldumise põhimõte',
			content: `Igal sukeldumisel järgin paarisukeldumise põhimõtet. Koostan sukeldumisplaani alati koos kaaslasega ja lisan plaani ka käitumisjuhised paarilisest eksimise ja ohuolukorra puhuks.`
		},
		{
			title: 'Sukeldumistabelid ja kompuuter',
			content: `Oskan hästi kasutada sukeldumistabeleid ja/või kompuutrit. Teen ainult otsetõusuga sukeldumisi jättes alati ohutusvaru. Tõusukiirus on maksimaalselt 18 meetrit minutis. Kõigil sukeldumistel kasutan seadmeid, mille abil saan jälgida sukeldumise aega ja sukeldumissügavust. Keelatud on ületada NITROXI ohutuspiire. Alustan pinnaletõusu mitte hiljem kui ballooni on jäänud 50atm.`
		},
		{
			title: 'Ujuvuse kontrollimine',
			content: `Säilitan veepinnal piisavat positiivset ujuvust. Neutraalse ujuvuse tagamiseks reguleerin oma lisaraskuse veepinnal tühja sukeldumisvestiga. Sukeldumise ajal säilitan neutraalse ujuvuse. Veepinnal sean ujumiseks ja puhkamiseks positiivse ujuvuse. Raskused paigutan nii, et need oleks hõlpsasti eemaldatavad ujuvuse lisamiseks ohuolukorras.`
		},
		{
			title: 'Hingamine ja füüsiline koormus',
			content: `Ma ei hoia sukeldumise ajal hinge kinni ega püüa õhku kokku hoida. Väldin liigset hüperventilatsiooni pinnasukeldumisel. Väldin üleväsimust pinnal ja vee all sooritan kõik sukeldumised oma võimete piirides.`
		},
		{
			title: 'Lisavahendite kasutamine',
			content: `Kui on võimalik kasutan veepinnal paati, poid või mõnda muud ujuvvahendit.`
		},
		{
			title: 'Seadusandluse järgimine',
			content: `Tunnen sukeldumist puudutavat seadusandlust ning järgin seda, sealhulgas kalapüüki ja sukeldumislipu kasutamist puudutavaid norme ja eeskirju. Looduse reostamine ja rikkumine pole sukeldujale sobiv.`
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
				<div class="p-6 bg-amber-50 border border-amber-200 rounded-xl">
					<div class="flex items-start space-x-3">
						<div class="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
							<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-amber-800 mb-2">Meeldetuletus</h4>
							<p class="text-amber-700 leading-relaxed">
								Need reeglid on koostatud teie turvalisuse tagamiseks. Palun tutvuge nendega hoolikalt ja järgige alati ohutusreegleid sukeldumise ajal.
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
