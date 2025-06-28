<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Phone, Mail, MapPin, Clock, Calendar } from 'lucide-svelte';

	// Page data configuration - customize for each page
	const pageData = {
		title: 'Sukeldumiskursused algajatele',
		subtitle: 'PADI Open Water Diver või NDL Diver kursus on ABC sukeldujaks saamisel',
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
					<h2 class="text-3xl font-bold text-gray-900 mb-6">Alustad ikka algusest</h2>
					
					<p class="text-lg text-gray-700 leading-relaxed mb-4">
						<strong>PADI Open Water Diver</strong> või <strong>NDL Diver</strong> kursus on ABC sukeldujaks saamisel. 
						Instruktori juhendamisel saad selgeks sukeldumise algtõed. Alustad basseinisukeldumistest ja 
						teoreetiliste teadmiste omandamisest. Kursus lõpeb avaveesukeldumistega. Algkoolitusel on 
						varustus koolitaja poolt ja kursuse hinna sees.
					</p>
					
					<p class="text-lg text-gray-700 leading-relaxed mb-4">
						Algkursusele asumiseks pead olema vähemalt 10 aastane, terve ja tundma ennast vees mugavalt. 
						Sinu tervisliku valmisoleku sukeldumiseks selgitame välja lühikese ankeedi abil. Füüsiline 
						puue pole ilmtingimata takistus sukeldujaks saamisel. Kõik kes täidavad kursuse sooritusnõuded 
						saavad ka litsentseeritud. Küsi kahtluse korral kindlasti oma instruktorilt nõu ja juhatust.
					</p>
					
					<div class="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
						<h3 class="text-xl font-bold text-gray-900 mb-2">Kõlab huvitavalt?</h3>
						<p class="text-gray-700">
							Avaveesukelduja eluaegse sukeldumissertifikaadi omanikuks on võimalik saada vaid paari nädalaga.
						</p>
					</div>
				</div>

				<!-- Course Tabs -->
				<div class="space-y-8">
					<h2 class="text-3xl font-bold text-gray-900">Vali sobiv kursus</h2>
					
					<Tabs.Root value="padi" class="w-full">
						<Tabs.List>
							<Tabs.Trigger value="padi">PADI OWD Koolitus</Tabs.Trigger>
							<Tabs.Trigger value="ndl">NDL DIVER Koolitus</Tabs.Trigger>
						</Tabs.List>
						
						<Tabs.Content value="padi" class="mt-8 space-y-8">
							<p class="text-lg text-gray-700 leading-relaxed">
								PADI Open Water Diver kursus on ABC sukeldujaks saamisel. Instruktori juhendamisel saad 
								selgeks sukeldumise algtõed. Alustad basseinisukeldumistest ja teoreetiliste teadmiste 
								omandamisest. Kursus lõpeb avaveesukeldumistega. OWD koolitusel on varustus koolitaja 
								poolt ja kursuse hinna sees.
							</p>
							
							<p class="text-lg text-gray-700 leading-relaxed">
								Sukeldumise õppimine ei ole keeruline aga nagu iga hea asi, nõuab veidi aega ja tööd. 
								PADI OWD kursus koosneb kolmest osast: basseinisukeldumised, teooria ja avaveesukeldumised. 
								Kursuse plaan on paindlik ja põhineb sinu sooritusel. Koos instruktoriga võid kogu 
								programmi sooritada mõne päeva kuni mõne nädala jooksul.
							</p>
							
							<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Kursuse osad</h3>
								
								<div class="space-y-6">
									<div>
										<h4 class="text-xl font-semibold text-gray-900 mb-2">Teooria</h4>
										<p class="text-gray-700">
											Teooriaosas saad selgeks sukeldumise põhitõed. Nagu näiteks: rõhu mõju sinu kehale, 
											kuidas valida varustust, kuidas sukeldumisi planeerida jne. Teooriamoodulid koosnevad 
											iseseisvast tööst, video vaatamisest, küsimuste esitamisest ja neile vastuste leidmisest.
										</p>
									</div>
									
									<div>
										<h4 class="text-xl font-semibold text-gray-900 mb-2">Basseinisukeldumised</h4>
										<p class="text-gray-700">
											Sukeldumine – see on ju põhjus, miks kursusele tuldud sai. Basseini rahulikus ja 
											turvalises keskkonnas õpid selgeks hädavajalikud oskused. Alustades varustusega 
											tegelemisest kuni ujuvuse juhtimise ja eriolukordade lahendamiseni. Ja lõbus on see ka. 
											Basseinisukeldumisi on viis ja me teeme naid kahe päeva jooksul.
										</p>
									</div>
									
									<div>
										<h4 class="text-xl font-semibold text-gray-900 mb-2">Avaveesukeldumised</h4>
										<p class="text-gray-700">
											Basseinisukeldumiste jätkuks teed neli sukeldumist avavees: meres, järves või karjääris. 
											Koos oma instruktori ja uute sõpradega rakendad kõiki kursusel omandatud teadmisi ja 
											oskusi. Avaveesukeldumisi võid teha nii oma kodulähedases veekogus kui mõnes kaugemas 
											ja eksootilisemas punktis. Talvisel perioodil on sul võimalus oma kursus lõpetada 
											puhkusereisil olles!
										</p>
									</div>
								</div>
								
								<p class="text-lg text-gray-700 leading-relaxed mt-6">
									OWD Kursusele asumiseks pead olema vähemalt 10 aastane, terve ja tundma ennast vees mugavalt. 
									Sinu tervisliku valmisoleku sukeldumiseks selgitame välja lühikese ankeedi abil. Füüsiline 
									puue pole ilmtingimata takistus sukeldujaks saamisel. Kõik kes täidavad kursuse sooritusnõuded 
									saavad ka litsentseeritud. Küsi kahtluse korral kindlasti oma instruktorilt nõu ja juhatust.
								</p>
								
								<div class="bg-blue-50 border border-blue-200 p-6 rounded-lg">
									<p class="text-gray-700 font-medium">
										PADI OWD kursus ei ole sinu sukeldujakarjääri tipp. Kui sukeldumine sulle huvi pakub ja 
										tahad ennast edasi arendada, õpi juurde ja omanda kogemusi edasijõudnute kursusel 
										<strong>PADI Advanced Open Water Diver</strong>.
									</p>
								</div>
							
							<!-- PADI Course Chart Image -->
							<div class="mt-8">
								<img 
									src="/photos/padi-course-chart-2021.jpg" 
									alt="PADI kursuste skeem 2021"
									class="w-full h-auto rounded-lg shadow-lg"
								/>
							</div>
						</Tabs.Content>
						
						<Tabs.Content value="ndl" class="mt-8 space-y-8">
							<p class="text-lg text-gray-700 leading-relaxed">
								NDL DIVER kursus on ABC sukeldujaks saamisel. Instruktori juhendamisel saad selgeks 
								sukeldumise algtõed. Alustad basseinisukeldumistest ja teoreetiliste teadmiste omandamisest. 
								Kursus lõpeb avaveesukeldumistega. NDL koolitusel on varustus koolitaja poolt ja kursuse 
								hinna sees. Kursuse läbimisel on maksimaalseks lubatud sukeldumise sügavuseks 18m.
							</p>
							
							<p class="text-lg text-gray-700 leading-relaxed">
								Sukeldumise õppimine ei ole keeruline aga nagu iga hea asi, nõuab veidi aega ja tööd. 
								NDL Diver kursus koosneb kolmest osast: basseinisukeldumised, teooria ja avaveesukeldumised. 
								Kursuse plaan on paindlik ja põhineb sinu sooritusel. Koos instruktoriga võid kogu 
								programmi sooritada mõne päeva kuni mõne nädala jooksul.
							</p>
							
							<h3 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Kursuse osad</h3>
								
								<div class="space-y-6">
									<div>
										<h4 class="text-xl font-semibold text-gray-900 mb-2">Teooria</h4>
										<p class="text-gray-700">
											Teooriaosas saad selgeks sukeldumise põhitõed. Nagu näiteks: rõhu mõju sinu kehale, 
											kuidas valida varustust, kuidas sukeldumisi planeerida jne. Teooriamoodulid koosnevad 
											iseseisvast tööst, video vaatamisest, küsimuste esitamisest ja neile vastuste leidmisest.
										</p>
									</div>
									
									<div>
										<h4 class="text-xl font-semibold text-gray-900 mb-2">Basseinisukeldumised</h4>
										<p class="text-gray-700">
											Sukeldumine – see on ju põhjus, miks kursusele tuldud sai. Basseini rahulikus ja 
											turvalises keskkonnas õpid selgeks hädavajalikud oskused. Alustades varustusega 
											tegelemisest kuni ujuvuse juhtimise ja eriolukordade lahendamiseni. Ja lõbus on see ka. 
											Basseinimooduleid on viis ja me teeme neid kahe päeva jooksul.
										</p>
									</div>
									
									<div>
										<h4 class="text-xl font-semibold text-gray-900 mb-2">Avaveesukeldumised</h4>
										<p class="text-gray-700">
											Basseinisukeldumiste jätkuks läbid sa neli avavee tundi: meres, järves või karjääris. 
											Koos oma instruktori ja uute sõpradega rakendad kõiki kursusel omandatud teadmisi ja 
											oskusi. Avaveesukeldumisi võid teha nii oma kodulähedases veekogus kui mõnes kaugemas 
											ja eksootilisemas punktis. Talvisel perioodil on sul võimalus oma kursus lõpetada 
											puhkusereisil olles!
										</p>
									</div>
								</div>
								
								<p class="text-lg text-gray-700 leading-relaxed mt-6">
									Diver kursusele asumiseks pead olema vähemalt 10 aastane, terve ja tundma ennast vees mugavalt. 
									Sinu tervisliku valmisoleku sukeldumiseks selgitame välja lühikese ankeedi abil. Füüsiline 
									puue pole ilmtingimata takistus sukeldujaks saamisel. Kõik kes täidavad kursuse sooritusnõuded 
									saavad ka litsentseeritud. Küsi kahtluse korral kindlasti oma instruktorilt nõu ja juhatust.
								</p>
								
								<div class="bg-green-50 border border-green-200 p-6 rounded-lg">
									<p class="text-gray-700 font-medium">
										NDL Diver kursus ei ole sinu sukeldujakarjääri tipp. Kui sukeldumine sulle huvi pakub ja 
										tahad ennast edasi arendada, õpi juurde ja omanda kogemusi edasijõudnute kursusel 
										<strong>NDL Universal Diver</strong>.
									</p>
								</div>
							
							<!-- NDL Course Image -->
							<div class="mt-8">
								<img 
									src="/photos/ndl-dive-courses-2025.jpg" 
									alt="NDL sukeldumiskursused 2025"
									class="w-full h-auto rounded-lg shadow-lg"
								/>
							</div>
						</Tabs.Content>
					</Tabs.Root>
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
