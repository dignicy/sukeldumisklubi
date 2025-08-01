<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Clock, Calendar, Fish, AlertTriangle } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	// Template configuration - easily customizable
	const pageTitle = 'Siseveekogud';
	const pageSubtitle = 'Sukeldumiskohad järvedes ja karjäärides';
	const heroImage = '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
	
	const introText = `Eesti järved on enamasti madalad ja mudased. Sukeldumiseks kõlblikke järvi on kümmekond. Võrreldes merega on nähtavus kehvem, seevastu kalariik ja taimestik rikkalikum. Tavaline on järvedes kohata uudishimulikke hauge, põgenevaid särgi, ahvenaid või luuravaid karpkalu. Suve teisel poolel on vesikasvud moodustanud kohati läbipääsmatu dzhungli. Järvevee temperatuur sõltub allikatest.`;

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

	// Simplified freshwater diving sites data
	const lakes = [
		{
			id: "rummu-karjaar",
			name: "Rummu karjäär",
			depth: "8–12 m",
			special: false,
			content: "Rummu Ekskavaator on vaatamisväärsus omaette – suur, võimas ja hästi säilinud! Rummu karjäär ilmast vähesõltuv ja suhteliselt ohutu koht. Sügavus mõnus, 8–12 m. Suurepärane koht ka talvisteks jääsukeldumisteks.\n\nÜhel ilusal päeval hakkas vesi karjääris tõusma ning teadmata põhjustel ei vaevunud keegi ekskavaatorit päästma. Vesi olla tõusnud küll piisavalt aeglaselt, et teda sealt kätte saada ja kuivale tuua aga ju siis olid asjaosalistel omad põhjused teda mitte välja tuua. Ja hea ongi, nüüd on meil vähemalt mida vaatamas käia!\n\nEkskavaatori juures on vesi umbes 8–9 m sügav, algajatele just paras sügavus. Kopp on sellel monstrumil päris suur, pool autot mahub sinna vabalt sisse. Mootoriruumi on kurikaelad kahjuks juba rüüstamas käinud ning ilmselt on see vask, mis sealt puudu on. Nii, et päris ühe matsuga teda käima enam ei saa aga tervikliku pildi kindlasti.\n\nPäris vahva veealune monstrum, kes tahab tulgu ise vaatama!"
		},
		{
			id: "saadjarv",
			name: "Saadjärv",
			depth: "kuni 25 m (keskmine 8 m)",
			special: false,
			content: "Saadjärv – üks omapärasemaid ja huvitavamaid Eesti järvi, suurim järv Vooremaal. Saadjärv asub Jõgeva ja Tartu maakonna piirimail, Tartust 16 km põhja pool. Ü. Hermanni andmeil asetseb Saadjärv meretasemest 53,4 m kõrgemal. Järv on 6 km pikk ja kuni 1,8 km lai, tema pindala on 707,6 ha. Suurim sügavus järve edelaosas kalmistu kohal on 25 m, keskmine sügavus 8 m. Varem on Saadjärv olnud suurem ja ta veetase kõrgem.\n\nJärve ümbritseb kirdest Saadjärve voor, edelast Sootaga voor. Ka loode ja kagu pool ulatuvad järve lähedusse voorjad kõrgendikud. Järve ümbruses on Saadjärve ja Kukulinna asundus, Tabivere, Valgma ja Äksi küla ning mitu vähemat asulat. Järv on loode–kagu suunas piklik ja koosneb kahest osast – kagupoolsest, suuremast ja sügavamast Suurjärvest ning loodepoolsest, kitsamast ja madalamast Tabivere ehk Voldi järvest.\n\nSaadjärve vesi on enamasti rohekaskollane kuni kollakasroheline, harva heleroheline. Vee läbipaistvus on kogu aasta keskmine kuni väga suur (2,0–6,2 m). Vesi on harilikult selgelt kihistunud. Suvel on järve süvakihtides vähe hapnikku ning ka talvel ei ole asi parem.\n\nSaadjärv on varem olnud väga kalarikas. Kalaliikide arv on praegugi üsna suur. Ohtramad on särg, ahven, rääbis, latikas, haug, leidub kiiska, viidikat, linaskit, mudamaimu, angerjat, hinku, lutsu, kokre, vingerjat, võldast, luukatitsat. Kukulinna kohalt on püütud 5–6 kg raskusi latikaid. Saadjärve rääbis, mis on siin tõenäoliselt elanud aastatuhandeid, on suurim Eestis. Kuni 1949. aastani olnud Saadjärv väga vähirikas, siis hävis vähistik katku tõttu."
		},
		{
			id: "rouge-suurjarv",
			name: "Rõuge Suurjärv",
			depth: "kuni 38 m (keskmine 11,9 m)",
			special: false,
			content: "Võru maakonnas, Haanja kõrgustiku lääneosa lõhestavas kuni 75 m sügavuses loode–kagusuunalises Rõuge ürgorus leidub seitse järve (kagust lugedes Valg-, Liin-, Suur-, Kauss-, Ratas-, Tõug- ja Kahrila järv) ja üks järvik (Valgjärvest eraldunud Perajärv). Teiste Eesti järvedega võrreldes on siinsed järved erakordselt sügavad.\n\nRõuge Suurjärv on loode–kagu suunas piklik järv, mis asub Rõuge alevikus. Eesti järvede hulgas kõige sügavam. Tema sügavuseks sai M. zur Mühlen 1907. a. 41 m, H. Riikoja 1933. a. 37,5 m, A. Mäemets 1962. a. 38 m. Sügavaim koht on järve keskosast veidi kagu pool. Järve pindala on 13,5 ha, keskmine sügavus 11,9 m (keskmise sügavuse poolest on Suurjärv teisel kohal, Väikese Palkna järve järel).\n\nLäbivool on keskmise tugevusega. Järve vee värvus varieerub oranžist heleroheliseni ning läbipaistvus samuti väga suures ulatuses (1,1–7,1 m).\n\nKalastik koosneb peamiselt ahvenast ja särjest; esinevad veel haug, kiisk, nurg, hink, ojasilm; leiduvat roosärge, lutsu, viidikat ja angerjat. Sisse on lastud vikerforelli, peledit ja peipsi siiga (viimased kaks on järve püsima jäänud).\n\nRahvamuistendi järgi olevat Suurjärve põhja vajunud kirik, kuhu korraga seitse venda sisse läinud. Suvel olevat kirik isegi nähtav."
		},
		{
			id: "porkuni-jarv",
			name: "Porkuni järv",
			depth: "kuni 2,8 m",
			special: false,
			content: "Porkuni–Lemküla järvestik on Lääne-Viru maakonnas, Pandivere kõrgustikul, Porkunist kuni 5 km põhja poole ulatuv põhja–lõunasuunaline järvedeahel. Lõuna poolt lugedes: Porkuni järv, Piisupi järv, Sahkjärv, Ratasjärv, Võhmetu järv, Mardihansu järv, Kannukse soon, Lemküla järv ja Süsijärv; lisaks mitmed väiksemad järveked.\n\nPorkuni järv on Väike-Maarjast 5,5 km loode pool loksus loode–kagusuunalises ürgorus. Absoluutkõrgus 107 m, pikkus 2 km, pindala 41,4 ha. Veekogu on suurel määral tehislikult paisutatud. Järv on neljaosaline: suurim kagupoolne Suurjärv (36 ha), keskel Lossijärv, sellele läänes Aiajärv (~1 ha), ja Iiri järv ning Alumine järv (~4 ha) nn. Armuvalusillaga eraldatuna.\n\nVeekogu toitub peamiselt allikatest, väljavooluks Valgejõkke. Vesi heleroheline, läbipaistev, hästi segunev; Alumises järves suvel rohelisem ja vähem läbipaistev.\n\nKalastik: varem koger ja ahven, nüüd rohkesti kokre ja lehmaim.\n\nJärv on punapea-vardi tüüpi, linnujärv – ligi 35 paari hallpõsk-püti, lauke, punapeavarte, tuttvarte, rästasroolinde, rootsiitsitajaid jt. haruldane tait."
		},
		{
			id: "paunkula-veehoidla",
			name: "Paunküla veehoidla",
			depth: "kuni 8 m (keskmine 1–2 m)",
			special: false,
			content: "Paunküla veehoidla loodi 1960. kevadel Pirita jõe paisutamisel. Tekkinud ~350 ha veekogu hõlmas Tudre, Väikese ja Suure Seapilli järve. 1975/76 veehoidla mahu suurendamine. Pirita jõe ojal osakaal ~1/20 veehoidla pindalast.\n\nVeekogu on loode–kagu suunaline, jagatud vallseljakuga kaksiks. Eesti siseruumides üks liigestatuma kaldajoonega ja saarterikkamaid veekogusid (30+ saart). Sügavaim koht endise Väikese Seapilli kohal; enne rajamist sügavus 5–6 m, peale täiendamist paar meetrit rohkem. Keskmine sügavus enne 1975 oli 1–2 m, jõesängis 3 m, endistes järvedes 5–6 m.\n\nVeehoidla kalastik liigirikas, kuid mitte arvukas. Domineerib haug (kuni 11 kg), esineb särg, ahven, kiisk, roosärg, nurg, latikas, angerjas, kokre, linask, luts, ojasilm, teibid. Mitmel korral sisse lastud hõbekokre."
		},
		{
			id: "paukjarv",
			name: "Paukjärv",
			depth: "kuni 11,1 m (keskmine 5,9 m)",
			special: false,
			content: "Aegviidu–Paukjärve oosiku lääneküljel asuv 8,6 ha suurune järv, maksimaalne sügavus 11,1 m, keskmine 5,9 m. Vesi süveneb järsult. Põhjakaarel peaaegu kõva, liivane mineraalmaa laskub otse vette. Loode­nurgas ujula vundamendid. Lõunakalda lähedal saar haavade, leppade ja väikese männikuga. Kaldavööde liivane, 3–4 m sügavusel pruunikas sapropeel, sügavamal kuni 2 m paksune haisva sapropeeli kiht. Vees palju ronte.\n\nUmbjärv, toitub peamiselt sademetest.\n\nTaimestik erakordselt vaene. Kalad: ahven, särg, haug; A. H. Tammsaare püüdnud 1907 paarinaelase haugi. Sisse lastud hõbekokre.\n\nKa kaitsealused Liivjärv ja Umerikjärv Paukjärvest 200 m ja 500 m kagu pool – viimase termokarstiline sügavus 15 m Põhja-Eestis.\n\nPaukjärv ja ümbrus, eriti põhjakallas, pakuvad esteetilist naudingut ja inspireerisid A. H. Tammsaaret \"Kõrboja peremehe\" loomiseks."
		},
		{
			id: "koorkula-valgjarv",
			name: "Koorküla Valgjärv",
			depth: "kuni 26,8 m (keskmine 8,5 m)",
			special: true,
			content: "3 km Koorküla keskusest lõuna pool, 70,9 m merepinnast kõrgem. Pindala 44,1 ha, sügavus 26,8 m, keskmine 8,5 m. Kaldad liivased/kruusased, kõrged ja järsud eriti lõuna pool, läänepool laugemad ja mudasemad.\n\nPõhi rahutu reljeefiga: kaks sügavat vagumust (kirde- ja lõunaosas), keskosas madalik \"Mõisa ase\" (~1 m vee all), kaguosas madalik \"Mägi\". Põhi üleüldse õhukese mudakihiga.\n\nVesi heleroheline kuni kollakasroheline, läbipaistvus 3,7–4,5 m, talvel veidi enam; selgelt kihistunud.\n\nKalafauna: latikas, särg, haug, ahven, linask, roosärg, kiisk, kokre, luts; jõevähk. Ondatra (vesirotang) tegevuse jäljed.\n\nHea supel- ja kalastuskohake; koos ümbrusega (kuni 300 m kaldast) kohaliku kaitse all. Arheoloogiline tähtsus – vaiehitis 1310–1430 keskel \"Mõisa ase\" madalikul, mälestus ohvriallikast \"Silmaallikas\"."
		},
		{
			id: "kiruvere-jarv",
			name: "Kiruvere järv",
			depth: "kuni 11,2 m (keskmine 5,4 m)",
			special: false,
			content: "Harju maakonnas lõunaosas Paunküla mägedes, termokarstiliste lehtritega oosistikul. Paunküla asundusest 2 km lõunakagu.\n\nPindala 22 ha, suurim sügavus 11,2 m, keskmine 5,4 m, absoluutkõrgus 67,9 m. Kaldad lausad või madalad, edelas ja idas järsud. Põhi üldiselt kõva, kohati kruusane või kivine; sügavamal muda.\n\nToitub peamiselt allikatest (palju kirdeosas), väljavool Pirita jõkke. Vesi pruunikaskollane, läbipaistvus 2,5–3,3 m, kihistunud.\n\nKalafauna: särg, ahven, latikas, haug, viidikas, roosärg, kiisk, koger, linask, luts, hink.\n\nSobib maastiku kaunistamiseks, õngespordiks, ujumiseks ja puhkimiseks.\n\nMuinasehitise jäänused keskel ja raudse sulatamise jäljed ümbruses."
		},
		{
			id: "antu-jarved",
			name: "Äntu järved",
			depth: "kuni 8 m",
			special: false,
			content: "Äntu järvestik Lääne-Viru maakonnas metsarikkas soostikus, 7 väikejärvega.\n\nÄntu Valgejärv (1,4 ha, sügavus 8 m) – ümarik, kagu pool Äntu metsavahikohast. Kaldad õõtsikulised, läänekaldal ujumissild. Põhi kattub järvelubiga. Läbipaistvus 6,1–>6,8 m, kihistunud. 1967 vähem taimestikku kui naabritel. Pilliroo ja ujulehtedega vöönd, põhjal mändvetikad.\n\nÄntu Sinijärv (2,4 ha, sügavus 8 m) – põhja–lõuna suunaline sopiline poolsaarega. Kaugus Väike-Maarjast 7 km. Vallseljak idas, mujal segamets; kaldad õõtsikulised. Põhja põhjaallikaaugud 2 m sügavusel. Läbipaistvus 8 m; rohekas-helesinine/sinakasroheline, suvel kihistunud; suvel hapnikurikas, talvel hapnikuvaene ja väävelvesiniku sisaldav.\n\nÄntu Roheline järv (0,8 ha, sügavus 3,3 m) – Sini- ja Valgejärve vahel, poolsaarega ja saartega. Kaldad õõtsikulised, põhja põhjal järvelubi. Läbib Sinijärvest tulev ja Valgejärve suubuv ojake; võimalik põhjaallikas. Vesi kollakasroheline, mudane, läbipaistvus madal, segunev.\n\nÄntu Linaleojärv (0,25 ha) – ümarik, 0,7 km Valgejärvest lõuna pool. Sissevool Valgejärvest, väljavool Äntu oja kaudu Nõmme jõkke. Vesi selge, eelnevate järvede omadustega.\n\nKalastik: ahven, särg, haug; võib olla koger. Varem rohkesti jõevähki."
		}
	];
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

				<!-- Lakes Accordion -->
				<div class="space-y-4 sm:space-y-6">
					<h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-8">Sukeldumiskohad</h2>
					
					<Accordion.Root type="multiple" class="w-full space-y-3 sm:space-y-4">
						{#each lakes as lake}
							<Accordion.Item value={lake.id} class="border border-slate-200 rounded-xl overflow-hidden">
								<Accordion.Trigger class="flex w-full items-center justify-between bg-slate-50 px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-slate-100 transition-colors">
									<div class="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
										<div class="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<Fish class="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
										</div>
										<div class="min-w-0 flex-1">
											<h3 class="text-lg sm:text-xl font-bold text-gray-900 truncate">{lake.name}</h3>
											<div class="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mt-1 space-y-1 sm:space-y-0">
												{#if lake.depth}
													<Badge variant="secondary" class="text-xs w-fit">
														Sügavus: {lake.depth}
													</Badge>
												{/if}
												{#if lake.special}
													<Badge variant="destructive" class="text-xs w-fit">
														Muinsuskaitsealune
													</Badge>
												{/if}
											</div>
										</div>
									</div>
								</Accordion.Trigger>
								
								<Accordion.Content class="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
									<div class="space-y-3 sm:space-y-4">
										<!-- Heritage Protection Warning -->
										{#if lake.special}
											<div class="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
												<div class="flex items-center space-x-2 mb-2">
													<AlertTriangle class="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
													<h4 class="font-semibold text-red-800 text-sm sm:text-base">Oluline!</h4>
												</div>
												<p class="text-red-700 text-xs sm:text-sm">Muinsuskaitsealune objekt – sukeldumine erilubadega!</p>
											</div>
										{/if}

										<!-- Content -->
										{#if lake.content}
											<div class="text-gray-700 leading-relaxed space-y-3 sm:space-y-4">
												{#each lake.content.split('\n\n') as paragraph}
													<p class="text-sm sm:text-base">{paragraph}</p>
												{/each}
											</div>
										{/if}
									</div>
								</Accordion.Content>
							</Accordion.Item>
						{/each}
					</Accordion.Root>
				</div>

				<!-- Important Notice -->
				<div class="p-4 sm:p-6 bg-blue-50 border border-blue-200 rounded-xl">
					<div class="flex items-start space-x-3">
						<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
							<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
							</svg>
						</div>
						<div>
							<h4 class="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Oluline teave</h4>
							<p class="text-blue-700 leading-relaxed text-sm sm:text-base">
								Siseveekogudes sukeldumine nõuab erilist ettevaatlikkust - nähtavus võib olla kehv ja põhi mudane. Arvestage taimestiku ja veetemperatuuriga. Muinsuskaitsealustel objektidel sukeldumine ainult erilubade alusel. Järgige alati keskkonnakaitse nõudeid.
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
