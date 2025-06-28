<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Phone, Mail, MapPin, Clock, Calendar, Anchor, AlertTriangle, User } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';

	// Template configuration - easily customizable
	const pageTitle = 'Vrakid';
	const pageSubtitle = 'Sukeldumiskohad uppunud laevadele';
	const heroImage = '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
	
	const introText = `Sul on piisavalt sukeldumiskogemust ja tahaksid oma vee all veedetud aega sisukamalt täita, kui lihtsalt keskkonna ja oma varustusega harjumine. Üheks põnevaimaks mooduseks on sukeldumine mõnele uppunud laevale, eriti veel mõnele ajaloos hästi tuntud laevale.`;

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

	// Wrecks data in JSON format
const wrecksData = {
  "wrecks": [
    {
      "id": "aegna",
      "name": "Vrakk \"Aegna\"",
      "depth": "4-6m",
      "requirements": "OWD tase",
      "year_built": "1904",
      "year_sunk": "1945",
      "location": "Aegna madalik",
      "description": "Lebab Aegna madalikul 4–6 meetri sügavusel. \"Aegna\" nime kandnud aurik leidis kahjuks oma otsa Aegna saare lähistel omanimelisel madalikul. Ta lasti vette Saksamaal 1904 Howaldtswerke tehases Kielis. Laev oli 62 m pikk ja 671 BRT. 3-astmeline aurumasin andis 750 hj ja võttis peale kuni 200 inimest.",
      "content": "Ta kuulus enne Eestisse jõudmist Hamburg-Ameerika liniele nimega \"Adler\". 6. detsembril 1935 ostis laeva G. Sergo & Co. ning ta nimetati ümber Aegnaks ja pandi sõitma Tallinna ja Helsingi vahele. Sõja ajal viidi laev Leningradi ja ta sai nime \"Volhov\", olles Balti laevastiku baaslaev. Hukkumise asjaolud jäävad segaseks, kuid juhtus vahetult peale sõja lõppu. Vraki lainete ja jää poolt lõhutud kere sees on selgelt näha mootori osad, peavõll, suur vint jpm. Laeva kell leiti hiljuti Andrei Ossiptshuki poolt ja on nüüd Meremuuseumis.",
      "highlights": ["mootori osad", "peavõll", "suur vint", "laeva kell"],
      "hazards": ["madal vesi", "lained", "jää kahjustused"],
      "image": null
    },
    {
      "id": "bungsberg",
      "name": "Vrakk \"Bungsberg\"",
      "depth": "38m (tekid 27–33m)",
      "requirements": "Rescue Diver / Deep Diver",
      "year_built": "1924",
      "year_sunk": "1943",
      "location": "Naissaare lähistel",
      "description": "Vrakk lebab Naissaare lähistel kiilul püsti 38 m sügavusel, tekid 27–33 m. Ühes tükis ja hästi säilinud, osaliselt kaetud traalide ja võrkudega, kuid need ei sega liikumist.",
      "content": "Ehitati 1924 Howaldtswerke’s Hamburgis ja kandis nime Eva. Uppus 1943. aastal miini tõttu. Sobib ainult vahetaseme ja deep-diver tasemega sukeldumishuvilistele – sügavus, kaugus mandrist ja lainetus kujutavad väljakutset, kuid vraki suurus ja kaptenisild, varurooliratas ahtris ning meeskonna eluruumid on vaatamist väärt.",
      "highlights": ["kaptenisild", "varurooliratas ahtris", "meeskonna eluruumid"],
      "hazards": ["sügavus", "külm", "võrgud"],
      "image": null
    },
    {
      "id": "christine",
      "name": "Vrakk \"Christine\"",
      "depth": "29m",
      "requirements": "AOWD tase",
      "year_built": "1916",
      "year_sunk": "1943",
      "location": "Tallinna laht",
      "description": "Endine Hollandi kalatraaler (ex Marie, KW 40), Saksa Ost-Reval flotilli valvelaev ORe-35. Uppus miinide traalimisel 24.05.1943 Tallinna lahel.",
      "content": "Ehitatud 1916 Maasluijs laevatehases (127 BRT). Tugev plahvatus moonutas vööri ja keskosa, kus plahvatus pööras kere pahupidi. Tekil on redel ja katkine rool, masinaruumi läbiv avaus võimaldab selgel vee korral mootoreid näha – sisse ei mahu.",
      "highlights": ["rooliratas", "mootoriruum", "redel tekil"],
      "hazards": ["kalavõrgud", "sügavus"],
      "image": null
    },
    {
      "id": "fomalhaut",
      "name": "Vrakk \"Fomalhaut\"",
      "depth": "27m",
      "requirements": "Muinsuskaitse eriluba, AOWD tase",
      "year_built": "1901",
      "year_sunk": "1927",
      "location": "Käsmu sadama lähedal",
      "description": "Talupojapurjekas, ehitatud 1901 (49 m × 27 m) Riia sadamas. 1927. talvel pressis jää purjekat Käsmu sadamas puruks ja ta uppus.",
      "content": "Vrakk lebab 27 m sügavusel otse kiilul püsti, mastid murdunud, muidu heas seisukorras. Roolirattal nimi “Maria” – kas kokkuhoitud rooliratta päritolu või armastuse märk. “Fomalhaut” on araabia keeles “kala/vaala suu.”",
      "highlights": ["rooliratas nimega \"Maria\"", "purjeka konstruktsioon", "mastide jäänused"],
      "hazards": ["sügavus", "külm"],
      "special": "Muinsuskaitsealune vrakk",
      "image": null
    },
    {
      "id": "heino",
      "name": "Vrakk \"Heino\"",
      "depth": "15m",
      "requirements": "OWD tase",
      "year_built": "1902",
      "year_sunk": "1944",
      "location": "Aegna lähedal",
      "description": "Puksiir Heino (endine General Surovtsev), ehitatud 1902 Riias (18,3 m × 4,92 m). Uppus 21.11.1944 magnetmiini tõttu, hukkus kolm meeskonnaliiget.",
      "content": "Vrakk lebab 15 m sügavusel, plahvatus on eemaldanud osa mootoriruumi seinast ja kaptenisillast, kuid ülejäänud osa on hästi säilinud. Ligipääs paadiga Piritalt 20 min – hea pärasttööline sukeldumiskoht Tallinna inimestele.",
      "highlights": ["kaptenisild", "mootoriruum"],
      "hazards": [],
      "image": null
    },
    {
      "id": "iljusha",
      "name": "Vrakk \"Iljusha\"",
      "depth": "15m",
      "requirements": "OWD tase",
      "year_built": null,
      "year_sunk": null,
      "location": "Paljassaare lähistel",
      "description": "Vene sõjaväe poolt uputatud Iljusha-tüüpi (Projekt 1427) miinitraaler. Tekiehitised eemaldatud enne uputamist. Lebab kiilul 15 m sügavusel.",
      "content": "Vrakk asub Paljassaare lähistel ja on kiilul püsti. Tekiehitised on enne uputamist maha võetud. Vaatamisväärsused: ahtriagregaadid ja trümmid.",
      "highlights": ["ahtriagregaadid", "trümmid"],
      "hazards": [],
      "image": null
    },
    {
      "id": "jaen-tear",
      "name": "Vrakk \"Jaen Teär\"",
      "depth": "39m",
      "requirements": "Muinsuskaitse eriluba, Rescue Diver",
      "year_built": "1926",
      "year_sunk": "1944",
      "location": "Tallinna laht, Vahemadalast läänes",
      "description": "Saaremaal ehitatud purjekas, mis uppus 1944 vilja veoks. Istub püsti 39 m sügavusel, trümmis on vilja jäänused, rool terve ja tekil kompassi jäänused.",
      "content": "Vrakk asub laevateel, ent säilinud detailid (rool, kompass, vilja hulk) loovad ajastutruu tunde 1940ndatest. Muinsuskaitsealune vrakk pakub arheoloogilist väärtust ja hingelist sügavust sukeldumiselamusele.",
      "highlights": ["terviklik rool", "kompassi jäänused", "vili trümmis"],
      "hazards": ["sügavus", "laevatee"],
      "special": "Muinsuskaitsealune vrakk",
      "image": null
    },
    {
      "id": "jossif-stalin",
      "name": "Vrakk \"Jossif Stalin\"",
      "depth": "11m",
      "requirements": "OWD tase",
      "year_built": null,
      "year_sunk": "1941",
      "location": "Lohusalu laht",
      "description": "Lohusalu lahes 11 m sügavusel liivapõhjas laevavrakk, mis uppus 1941 miinide tõttu – hukkunud ligi 2000 inimest; inimluid leiti alles hiljuti.",
      "content": "Laevajäänused on peaaegu olematud, kuid vrakk pakub elupaika ahvenaparvedele. See on üks Eesti tuntuimaid vrakkisukelduskohti, mille ajalooline taust annab veealusele metallikuhjale sügavama tähenduse.",
      "highlights": ["ahvenaparved", "ajaloolised jäänused"],
      "hazards": [],
      "image": null
    },
    {
      "id": "krimulda",
      "name": "Vrakk \"Krimulda\"",
      "depth": "18m",
      "requirements": "",
      "year_built": null,
      "year_sunk": "1941",
      "location": "Lainemadalal",
      "description": "Läti aurik (1970 BRT), transpordilaev. Uppus 30.06.1941, hukkus 5 inimest. Vrakk lebab kiilul püsti 18 m sügavusel – vööri osa on rebitud, ülejäänud osa heas seisukorras.",
      "content": "Vrakk asub Lainemadalal 18 m sügavusel. Vööri osa on ära rebitud, kuid ülejäänud kere on hästi säilinud, pakkudes huvitavaid vaateid purunenud plangutusele ja metallile.",
      "highlights": [],
      "hazards": [],
      "image": null
    },
    {
      "id": "linnea",
      "name": "Vrakk \"Linnea\"",
      "depth": "18.2m (veepiirist 14.4m)",
      "requirements": "",
      "year_built": null,
      "year_sunk": "1915",
      "location": "Nordväina madal (59°06.13′N 23°01.78′E)",
      "description": "Miintraaler NO. 1 (endine Linnea), uppus 16.09.1915 Saksa allveelaeva UC4 miini tõttu. Laev lebab kiilul 18.2 m sügavusel, veepiirist 14.4 m.",
      "content": "Laev murdus kaheks – 1/5 esiosa eraldus koos 35 mm õhutõrjekahuriga; teine kahur lebab tekil korstna kõrval. Säilinud ahtrireeling, puidust tekiplangutus, üks puitmast ja osa aurumasinast. Ankur, sõukruvi ja roolileht on hästi äratuntavad. Õnnelikult päästeti kogu meeskond.",
      "highlights": ["35 mm õhutõrjekahur", "ankur", "aurumasinajäänused", "sõukruvi ja roolileht"],
      "hazards": [],
      "image": null
    },
    {
      "id": "metallist",
      "name": "Vrakk \"Metallist\"",
      "depth": "24-27m",
      "requirements": "AOWD tase",
      "year_built": "1903",
      "year_sunk": "1939",
      "location": "Balti meri",
      "description": "Kaubalaev (1382 BRT, 70,5 m × 11 m), ehitatud 1903 Newcastle’s. Vrakk seisab kiilul kerges vasakkaldes – kaptenissild ~24 m, trümmiluugid 26–27 m.",
      "content": "Trümmiluugid on lahti, võimaldades sügavamat avastust. Kaptenisillal on säilinud inglise-keelsed masina juhtpuldid. Enne I maailmasõda kandis laev mitut nime ja teenis eri omanike all.",
      "highlights": ["kaptenissild", "masina juhtpult", "trümmiluugid"],
      "hazards": ["sügavus", "külm"],
      "image": null
    },
    {
      "id": "raa",
      "name": "Vrakk \"Raa\"/\"Polaris\"",
      "depth": "26m",
      "requirements": "",
      "year_built": "1917",
      "year_sunk": "1941",
      "location": "Aegnast edelas",
      "description": "Purjekas (32,27 m × 8,67 m × 3,62 m, 226 BRT), ehitatud 1917 Koivistos Soomes nimega Polaris. Müüdi 1938 Eestisse, sai nime Raa. Uppus 08.08.1941 pommiplahvatuse tagajärjel. Vrakk lebab kiilul 26 m sügavusel.",
      "content": "Tekiehitised on plahvatuses kadunud ja sisemus on laiali paisatud. Suur osa huvitavatest esemetest (nt tüürpoordis) lebab ümberringi. Vrakk on elupaigaks ahvenaparvedele ja vähemalt ühele angerjale.",
      "highlights": ["tüürpoordis olevad esemed", "ahvenaparved", "angerjas"],
      "hazards": [],
      "image": null
    },
    {
      "id": "rasma",
      "name": "Vrakk \"Rasma\"",
      "depth": "4-10m",
      "requirements": "AOWD tase",
      "year_built": "1902",
      "year_sunk": "1941",
      "location": "Mohni ranna lähedal",
      "description": "Aurik Rasma (93 m), ehitatud 1902 Inglismaal. 05.07.1941 sõitis Mohni lähedal miinile ja randa, meeskond päästeti. Vrakk lebab 4–10 m sügavusel.",
      "content": "Vraki varemetest on hästi nähtav suur aurumasin, katlad, kaks vinti ja ülekandevõll. Laevalt pärineb kogu sõjaaja jahu, mida kasutas Viinistu küla.",
      "highlights": ["suur aurumasin", "katlad", "vint", "ülekandevõll"],
      "hazards": [],
      "image": null
    },
    {
      "id": "riksens-stander",
      "name": "Vrakk \"Riksens Ständer\"",
      "depth": "",
      "requirements": "Muinsuskaitse eriluba",
      "year_built": "1744",
      "year_sunk": "1790",
      "location": "Aegna saare lähistel",
      "description": "Rootsi 74-kahuriline laev Konung Adolf Frederik (1744), hiljem Riksens Ständer, sõitis 02.05.1790 Aegna juures madalikule ja põletati rootslaste poolt. Vraki jäänused on tänini nähtavad plangutuste ja üksikute puitdetailide näol.",
      "content": "Vrakist on alles peamiselt plangutust ja üksikuid detaile. Tema kahur ja ankur on mälestusmärgina püstitatud Reaalkooli kõrvale Estonia puiesteel 1897.",
      "highlights": ["plangutust", "puitdetaile"],
      "hazards": [],
      "image": null
    },
    {
      "id": "schleswig-holstein",
      "name": "Vrakk \"Schleswig-Holstein\"",
      "depth": "10m",
      "requirements": "Muinsuskaitse eriluba, OWD tase",
      "year_built": "1906",
      "year_sunk": "1944",
      "location": "Neugrundi madal",
      "description": "Saksa sõjalaev (14218 T, 127,6 m × 22,2 m), avas Teise maailmasõja 01.09.1939. 18.12.1944 sai pommitabamusi ja vajus 10 m sügavusele, 21.03.1945 õhati laevale jäänud osad.",
      "content": "Vrakk on tugevalt lagunenud, kuid mootorikatlad ulatuvad veepinnani. Ahtriosas on rohkesti pomme – ettevaatlikkus kohustuslik. Vraki jäänused on olnud lennukite märklauaks kuni 1956.",
      "highlights": ["mootorikatlad", "ahtriosas pommid"],
      "hazards": ["pommid"],
      "image": null
    },
    {
      "id": "skiv",
      "name": "Vrakk \"Skiv\"",
      "depth": "",
      "requirements": "",
      "year_built": null,
      "year_sunk": null,
      "location": "",
      "description": "",
      "content": "",
      "highlights": [],
      "hazards": [],
      "image": null
    },
    {
      "id": "t-32",
      "name": "Vrakk \"T-32\"",
      "depth": "",
      "requirements": "",
      "year_built": null,
      "year_sunk": "1943",
      "location": "Tiola sadamast 10 km",
      "description": "Elbing-klassi torpeedopaat sank 08.1943 omaenda miiniväljas Soome lahes. Vrakk on lagunenud kolmeks suuremaks tükiks, mis asuvad ~150 m raadiuses.",
      "content": "Ahtriosas on nähtavad suur vint, trossid ja miinid. Keskmises ja vööriosas on rohkesti miine – puudutada ei tohi. Elbing-klass kasutas topeltmootoreid ja boilereid, olles multifunktsionaalne laev.",
      "highlights": ["suur vint", "trossid", "Elbing-klassi konstruktsioon"],
      "hazards": ["miinid"],
      "image": null
    },
    {
      "id": "tutti",
      "name": "Vrakk \"Tutti\"",
      "depth": "16m",
      "requirements": "OWD tase",
      "year_built": "1898",
      "year_sunk": "1944",
      "location": "Aegna lähistel",
      "description": "Puksiir Tutti (15,6 m × 4,29 m) ehitatud 1898 Hamburgis. Uppus 21.11.1944 magnetmiini tõttu, hukkus üks meeskonnaliige. Vrakk lebab 16 m sügavusel.",
      "content": "Vrakk on üllatavalt hästi säilinud – rooliratas püsti ja ankur pakpoordis vraki kõrval, mida võib-olla mõni teine laev kaotas.",
      "highlights": ["rooliratas", "ankur"],
      "hazards": [],
      "image": null
    },
    {
      "id": "vanja",
      "name": "Vrakk \"Vanja\"",
      "depth": "18m",
      "requirements": "OWD tase",
      "year_built": null,
      "year_sunk": null,
      "location": "Paljassaare lähedal",
      "description": "Vene sõjaväe poolt uputatud Vanja-tüüpi (Projekt 669) miinitraaler. Lebab kiilul püsti 18 m sügavusel, vöör ja keskosa vigastatud, ahter terve.",
      "content": "Laeva mõõtmed 40,5×7,7×2,1 m, veesõiduk kaks M-870 diiselmootorit (2400 hj). Vraki ahter ja trümmid on hästi vaadeldavad.",
      "highlights": ["ahter", "trümmid", "poordid"],
      "hazards": ["võrgud", "nöörijupid"],
      "image": null
    },
    {
      "id": "vest",
      "name": "Vrakk \"Vest\"",
      "depth": "",
      "requirements": "",
      "year_built": "1936",
      "year_sunk": "1941",
      "location": "",
      "description": "Hüdrograafialaev Vest (56,8×9,3×3 m, 860 T) ehitati 1936. Uppus 23.06.1941 magnetmiini tõttu. Vrakk lebab kiilul ja on hästi säilinud.",
      "content": "Plahvatus purustas keskosa, kus näha messis söögiriistu ja klaasialustel kirja “Artur Krup”. Vööriosa ja masinaruumi saab läbi luukide vaadelda.",
      "highlights": ["söögiriistad messis", "Artur Krup klaasialused", "masinaruum", "vööriosa"],
      "hazards": [],
      "image": null
    },
    {
      "id": "viina-kuningas",
      "name": "Vrakk \"Viina Kuningas\"",
      "depth": "7m",
      "requirements": "",
      "year_built": null,
      "year_sunk": null,
      "location": "Tapurla sadama kai kõrval",
      "description": "Vraki jäänused lebavad 7 m sügavusel otse Tapurla sadama kai kõrval. Vraki vanuseks hinnatakse ~100 a, pikkus 24 m, tammepuust.",
      "content": "Vrakk moodustab madala sukeldumispaiga, kus puidu ja tamme jäägid pakuvad huvi nii sukeldajatele kui ookeanibioloogidele.",
      "highlights": [],
      "hazards": [],
      "image": null
    },
    {
      "id": "vims",
      "name": "Vrakk \"Vims\"",
      "depth": "",
      "requirements": "",
      "year_built": null,
      "year_sunk": null,
      "location": "",
      "description": "",
      "content": "",
      "highlights": [],
      "hazards": [],
      "image": null
    }
  ]
};


	// Extract wrecks from JSON data
	const wrecks = wrecksData.wrecks;
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

				<!-- Wrecks Accordion -->
				<div class="space-y-6">
					<h2 class="text-3xl font-bold text-gray-900 mb-8">Sukeldumiskohad</h2>
					
					<Accordion.Root type="multiple" class="w-full space-y-4">
						{#each wrecks as wreck}
							{#if wreck.name && wreck.description}
								<Accordion.Item value={wreck.id} class="border border-slate-200 rounded-xl overflow-hidden">
									<Accordion.Trigger class="flex w-full items-center justify-between bg-slate-50 px-6 py-4 text-left hover:bg-slate-100 transition-colors">
										<div class="flex items-center space-x-4">
											<div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
												<Anchor class="h-5 w-5 text-orange-600" />
											</div>
											<div>
												<h3 class="text-xl font-bold text-gray-900">{wreck.name}</h3>
												<div class="flex items-center space-x-4 mt-1">
													{#if wreck.depth}
														<Badge variant="secondary" class="text-xs">
															Sügavus: {wreck.depth}
														</Badge>
													{/if}
													{#if wreck.requirements}
														<Badge variant="outline" class="text-xs">
															{wreck.requirements}
														</Badge>
													{/if}
													{#if wreck.special}
														<Badge variant="destructive" class="text-xs">
															{wreck.special}
														</Badge>
													{/if}
												</div>
											</div>
										</div>
									</Accordion.Trigger>
									
									<Accordion.Content class="px-6 pb-6 pt-2">
										<div class="space-y-4">
											<!-- Basic Info -->
											{#if wreck.year_built || wreck.year_sunk || wreck.location || wreck.depth}
												<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
													{#if wreck.year_built}
														<div>
															<span class="font-medium text-gray-500">Ehitatud:</span>
															<div class="text-gray-900">{wreck.year_built}</div>
														</div>
													{/if}
													{#if wreck.year_sunk}
														<div>
															<span class="font-medium text-gray-500">Uppus:</span>
															<div class="text-gray-900">{wreck.year_sunk}</div>
														</div>
													{/if}
													{#if wreck.location}
														<div>
															<span class="font-medium text-gray-500">Asukoht:</span>
															<div class="text-gray-900">{wreck.location}</div>
														</div>
													{/if}
													{#if wreck.depth}
														<div>
															<span class="font-medium text-gray-500">Sügavus:</span>
															<div class="text-gray-900">{wreck.depth}</div>
														</div>
													{/if}
												</div>
											{/if}

											<!-- Description -->
											{#if wreck.description}
												<p class="text-gray-700 leading-relaxed">
													{wreck.description}
												</p>
											{/if}
											
											<!-- Additional Content -->
											{#if wreck.content}
												<p class="text-gray-700 leading-relaxed">
													{wreck.content}
												</p>
											{/if}

											<!-- Image -->
											{#if wreck.image}
												<div class="mt-4">
													<img 
														src={wreck.image} 
														alt={wreck.name}
														class="w-full max-w-md rounded-lg shadow-md"
													/>
												</div>
											{/if}

											<!-- Details Grid -->
											{#if (wreck.highlights && wreck.highlights.length > 0) || (wreck.hazards && wreck.hazards.length > 0) || wreck.requirements}
												<div class="grid md:grid-cols-2 gap-4 mt-6">
													<!-- Highlights -->
													{#if wreck.highlights && wreck.highlights.length > 0}
														<div class="bg-green-50 border border-green-200 rounded-lg p-4">
															<div class="flex items-center space-x-2 mb-3">
																<div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
																	<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
																		<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
																	</svg>
																</div>
																<h4 class="font-semibold text-green-800">Vaatamisväärsused</h4>
															</div>
															<ul class="space-y-1">
																{#each wreck.highlights as highlight}
																	<li class="text-green-700 text-sm">• {highlight}</li>
																{/each}
															</ul>
														</div>
													{/if}

													<!-- Hazards or Requirements -->
													{#if wreck.hazards && wreck.hazards.length > 0}
														<div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
															<div class="flex items-center space-x-2 mb-3">
																<AlertTriangle class="h-5 w-5 text-amber-600" />
																<h4 class="font-semibold text-amber-800">Ohud</h4>
															</div>
															<ul class="space-y-1">
																{#each wreck.hazards as hazard}
																	<li class="text-amber-700 text-sm">• {hazard}</li>
																{/each}
															</ul>
														</div>
													{:else if wreck.requirements}
														<div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
															<div class="flex items-center space-x-2 mb-3">
																<User class="h-5 w-5 text-blue-600" />
																<h4 class="font-semibold text-blue-800">Nõudmised</h4>
															</div>
															<p class="text-blue-700 text-sm">{wreck.requirements}</p>
														</div>
													{/if}
												</div>
											{/if}
						</div>
									</Accordion.Content>
								</Accordion.Item>
							{/if}
					{/each}
					</Accordion.Root>
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
							<h4 class="font-semibold text-amber-800 mb-2">Oluline teave</h4>
							<p class="text-amber-700 leading-relaxed">
								Vrakisukeldumised nõuavad vastavat kogemust ja väljaõpet. Palun järgige alati ohutusreegleid ja sukelduge ainult oma oskuste piirides. Muinsuskaitsealustel vrakidel sukeldumine nõuab eriloabl.
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
