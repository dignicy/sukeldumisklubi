<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Accordion from '$lib/components/ui/accordion';
	import { Phone, Mail, MapPin, Clock, Calendar, Info } from 'lucide-svelte';

	// Page data configuration - customize for each page
	const pageData = {
		title: 'Sukeldumiskursused edasijõudnutele',
		subtitle: 'Oled oma esimesed sammud sukeldujana teinud ja asi pakub sulle huvi',
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
<section class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid lg:grid-cols-3 gap-16">
			<!-- Main Content -->
			<div class="lg:col-span-2 space-y-16">

				<!-- Intro Section -->
				<div class="space-y-8">
					<h2 class="text-3xl font-bold text-gray-900 mb-6">Algus on tehtud, kuhu edasi?</h2>
					
					<p class="text-lg text-gray-700 leading-relaxed mb-4">
						Oled oma esimesed sammud sukeldujana teinud ja asi pakub sulle huvi. Edasiliikumiseks on su parim võimalus 
						<strong>PADI Advanced Open Water Diver (AOWD)</strong> või siis <strong>NDL Universal Diver</strong> või koos 
						sügavsukeldumisega <strong>NDL Advanced Universal Diver</strong> kursus. See kursus on hea võimalus teha 
						viis sukeldumist instruktori järelvalve all ja proovida sukeldumise erinevaid võimalusi nagu sügavsukeldumine, 
						orienteerumine, paadisukeldumine, vrakisukeldumine, kuiva ülikonnaga sukeldumine ja palju muud.
					</p>
					
					<p class="text-lg text-gray-700 leading-relaxed">
						Need sukeldumise koosnevad enamast kui lihtsalt veealune jalutuskäik ja viivad sind ühe sammukese lähemale 
						hobisukelduja kõrgeimale tasemele – <strong>Master Scuba Diver-ile</strong>.
					</p>
				</div>

				<!-- Course Accordion -->
				<div class="space-y-8">
					<h2 class="text-3xl font-bold text-gray-900">Edasijõudnute kursused</h2>
					
					<Accordion.Root type="single" class="w-full space-y-4">
						<Accordion.Item value="aowd" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								OWD – PADI Advanced Open Water Diver koolitus
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p>
										Niisiis – oled oma esimesed sammud sukeldujana teinud ja asi pakub sulle huvi. Edasiliikumiseks on su parim võimalus PADI Advanced Open Water Diver (AOWD) kursus või siis NDL Universal Diver või koos sügavsukeldumisega NDL Advanced Universal Diver kursus. See kursus on hea võimalus teha viis sukeldumist instruktori järelvalve all ja proovida sukeldumise erinevaid võimalusi nagu sügavsukeldumine, orienteerumine, paadisukeldumine, vrakisukeldumine, kuiva ülikonnaga sukeldumine ja palju muud. Need sukeldumise koosnevad enamast kui lihtsalt veealune jalutuskäik ja viivad sind ühe sammukese lähemale hobisukelduja kõrgeimale tasemele – Master Scuba Diver-ile.
									</p>
									<p>
										Kursusel teed instruktori juhatusel viis sukeldumist. Neist kaks on sügavsukeldumine ja orienteerumine. Ülejäänud kolm sukeldumist valite koos instruktoriga PADI/NDL standardsete erialade hulgast. Võid teha näiteks öösukeldumise, proovida kuiva ülikonda, teha paadi-, või vrakisukeldumist.
									</p>
									<p>
										Iga jätkukursuse sukeldumine läheb arvesse ka vastava erialakursuse esimese sukeldumisena.
									</p>
									<p>
										PADI AOWD/NDL UN Diver või NDL AD UN Diver kursusele asumiseks pead olema vähemalt 12 aastane, PADI OWD/NDL Diver (või mõne muu koolitusorganisatsiooni algõppega).
									</p>
									<div>
										<h4 class="font-semibold mb-2">Erialad ja PADI erialakursused:</h4>
										<ul class="list-disc list-inside space-y-1">
											<li>Paadisukeldumine</li>
											<li>Sügavsukeldumine</li>
											<li>Hoovusesukeldumine</li>
											<li>Kuiva ülikonnaga sukeldumine</li>
											<li>Rikastatud õhuga sukeldumine</li>
											<li>Jääsukeldumine</li>
											<li>Naturalist</li>
											<li>Allveefotograafia</li>
											<li>Öösukeldumine</li>
											<li>Ujuvuse seadmine (PPB)</li>
											<li>Otsimine ja tõstmine</li>
											<li>Vrakisukeldumine</li>
										</ul>
									</div>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="rescue" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								Rescue Diver kursus
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p class="font-semibold">
										Parimad sõnad Rescue Diver kursuse kirjeldamiseks on: väljakutse ja rahulolu.
									</p>
									<p>
										<strong>Rescue Diver</strong> kursus avardab sinu sukeldumisalaseid teadmisi ja oskusi. Õpid vaatama ja nägema teisi sukeldujaid enda ümber ning arvestama nii enda kui teiste ohutusega. Kursus sisaldab endas paraja annuse väljakutset aga tekitab sinus ka enesekindlust ja arendab kogemust. Õpid vältima, ära tundma ja lahendama sukeldumisel ettetulevaid probleeme ja õnnetusjuhtumeid. Paljud sukeldujad ütlevad, et see on nende elu põnevaim kursus.
									</p>
									<p>
										<strong>Kursuse jooksul puudutatakse järgmisi teemasid:</strong> eneseabi, sukelduja stress, hädajuhtumid ja vahendid nende lahendamiseks, paanikas sukelduja abistamine, vees elustamise tehnikad, veest väljatulek.
									</p>
									<p>
										<strong>Kursus koosneb</strong> viiest teooriamoodulist, kümne üksiku harjutuse õppimisest ja nelja stsenaariumi lahendamisest.
									</p>
									<p>
										<strong>Eelnõudmised:</strong> vanus vähemalt 12 a, PADI AOWD/NDL UN Diver tase, kehtiv esmaabi litsents, 20 logitud sukeldumist.
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="deep" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								Deep Diver erialakursus
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p>
										Sügavus võrgutab meid nagu Sireenid ja meie nagu Odüsseus – läheme…
									</p>
									<p>
										Koralliseinal safiirsinises vees on kerge anda järgi ahvatlusele laskuda veel pisut, ja siis veel ja veel. Vrakid sügavas vees ahvatlevad oma saladustega. Vahel tõmbab sügavus lihtsalt sellepärast, et ta on sügavus. Noortele sukeldujatele põnev, pisut kogenumatele – erutav ja kogenud sügavsukeldujatele respekt.
									</p>
									<p>
										PADI Open Water Diver/NDL Diver sukeldujad on kvalifitseeritud sukelduma 18 m sügavusse. Advandced sukeldujad kuni 30 meetrini. Väga vähesed sukeldujad võivad väita, et nad pole kunagi tundnud kiusatust sukelduda sügavale. Kui tahad sukelduda hobisukeldumise maksimaalse piiri – 40 meetrini, peaksid läbima Deep Diver erialakursuse.
									</p>
									<p>
										PADI/NDL Deep Diver erialakursus on loodud selleks, et õpetada sulle sügavsukeldumise võtteid, mis teevad hobi-sügavsukeldumise meldivaks ja ohutuks.
									</p>
									<p>
										<strong>Kursus koosneb</strong> teooria- ja sukeldumise osast. Teooriaosa valgustab sukeldumisteooria neid osi, mis puutuvad sügavuslimiite, varustust, sügavsukeldumise võtteid, lämmastikunarkoosi, dekohaigust ja muud. Kursuse praktiline osa koosneb vähemalt neljast sügavsukeldumisest, mille jooksul harjutad koos instruktoriga sügavsukeldumise võtteid ja tehnikat praktikas.
									</p>
									<p>
										Kursuse lõpuks oled kvalifitseeritud sukelduma 40 meetri sügavusse.
									</p>
									<p>
										<strong>Kursusele asumiseks</strong> pead olema vähemalt 15 aastane ja PADI AOWD/NDL UN Diver.
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="wreck" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								PADI Wreck Diver erialakursus
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p>
										Esimest korda vrakile sukeldumise põnevust pole võimalik millegagi võrrelda. Allapoole laskudes püüad aimata vraki piirjooni või mingidki märke temast. Siis ilmubki udune vari. Alguses ajab see veidi segadusse – siis justkui tuttavaks saades lähened ettevaatlikult, ta ilmub su ette selgelt oma täies ilus.
									</p>
									<p>
										Mis järgmiseks juhtub, sõltub tingimustest. Põhja Ameerika selgetes külmades järvedes võid leida sadu aastaid vanu vrakke peaaegu nagu uusi, troopilistes vetes võid kohata terveid uppunud/uputatud laevastikke. Vahe- ja Balti meres võid leida midagi, mis kogenematule silmale tundub vaid palgihunnikuna, aga kogenud sukeldujale on huvitav ajaloomälestis.
									</p>
									<p>
										<strong>Pole ime, et vrakisukeldumine on nii populaarne.</strong> Kui enamus sukeldumiskohad on looduslikud, siis vrakid on ju inimese kätetöö. Saad näha seda, kuidas ja mida inimesed on aastaid, kümneid või sadu tagasi teinud. Vrakid on elukohaks ka paljudele vee-elukatele. Nad on kunstlikud rifid, mis sisaldavad terveid ökosüsteeme. Neile kinnituvad selgrootud (karbid, käsnad, teod), kalad kogunevad nende ümber ja sisse. Vrakkidel leiduva eluslooduse hulk on võrreldav looduslike riffidega. Sukeldujatel on see privileeg, olla selle kultuuri ja ajaloo näidiste tunnistajateks. Sellepärast on vajalik, olla teadlik ja austada rangeid reegleid vrakkidele sukeldumisel.
									</p>
									<p>
										PADI/NDL Wreck Diver erialakursus on sissejuhatus vrakisukeldumisse. Ta annab teadmised ja oskused ohutuks sukeldumiseks vrakkidel.
									</p>
									<div>
										<p><strong>Kursusel käsitletaks järgmisi teemasid:</strong></p>
										<p>Vrakisukeldumise planeerimine, organiseerimine, protseduurid, võtted, probleemid ja ohud</p>
										<p>Vrakisukeldumisteks valmistumine ning valgustite, õhuvaru, erivarustuse, haspli ja liinide kasutamine</p>
										<p>Piiratud nähtavuses sukeldumine ja hädaprotseduurid.</p>
										<p>Kursus koosneb kolmest teooriamoodulist ja neljast avaveesukeldumisest</p>
									</div>
									<p>
										<strong>Kursusele asumiseks</strong> pead olema vähemalt 15 aastane ja PADI AOVD/NDL UN Diver.
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="master" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								PADI Master Scuba Diver
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p class="font-semibold">
										Liitu parimatega sukeldumismaailma parimatest. Ole tõeline meistersukelduja. Selle tasemeni jõudes saad PADI Master Scuba Diver nimetuse.
									</p>
									<p>
										PADI Master Scuba Diver on kõrgeim tase, mida hobisukelduja võib saavutada. See näitab, et oled väga hästi treenitud ja omad palju laialdasi ja põhjalikke teadmisi sukeldumisest.
									</p>
									<p>
										PADI Master Scuba Diver-iks saamiseks pead olema loginud vähemalt 50 sukeldumist, olema PADI Rescue Diver, omama vähemalt 5 sukeldumise erialalitsentsi ja olema vähemalt 12 aastane.
									</p>
									<p>
										Küsi lisa. Registreeru PADI MSD programmi.
									</p>
									<p>
										Armastus sukeldumise vastu, võimalus teadmisi ja oskusi edasi anda, elustiil, enesearendus, tegevus looduses ja looduse kaitsmine. Kõik see on sukeldumisprofessionaali töö ja elu. PADI professionaalid on maailma nõutuimad sukeldumisala spetsialistid. Pole tähtsust, kas töötad oma kodulähedases sukeldumiskeskuses või kusagil troopilises kuurordis – sinu elu on seiklus. Kui oled vähemalt 18 aastane, PADI Rescue Diver (või muu vastav) ja omad vajalikku sukeldumiskogemust saad õppida PADI professionaaliks.
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="divemaster" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								PADI Divemaster kursus
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p>
										Armastus sukeldumise vastu, võimalus teadmisi ja oskusi edasi anda, elustiil, enesearendus, tegevus looduses ja looduse kaitsmine. Kõik see on sukeldumisprofessionaali töö ja elu.
									</p>
									<p>
										Sukeldumise professionaalid on üldiselt maailmas nõutud sukeldumisala spetsialistid. Pole tähtsust, kas töötad oma kodulähedases sukeldumiskeskuses või kusagil troopilises kuurordis – sinu elu on seiklus.
									</p>
									<p>
										Kui oled vähemalt 18 aastane, PADI/NDL Rescue Diver (või muu vastav tase) ja omad vajalikku sukeldumiskogemust saad õppida PADI/NDL professionaaliks.
									</p>
									<p>
										<strong>Divemaster Course</strong><br>
										Sinu sukeldumisprofi karjäär algab siit. DM juhatab sukeldujate gruppe, abistab instruktorit kursustel. DM tohib läbi viia järgmisi programme: PADI Skin Diver kursus, Scuba Reveiw, Discover Local Diving, Discover Scuba Diving. DM saab õppida ka esmaabiinstruktoriks.
									</p>
									<p>
										DM koolitusprogrammi käigus töötad koos instruktoriga. Arendad oma sukeldumisalaseid teadmisi ja oskusi profitasemeni. DM kursus õpetab sind inimesi juhtima, teostama järelvalvet ja assisteerima instruktorit koolitustel. DM programmi kuulub teooria õppimine klassis, iseseisev töö töövihikuga, vastupidavuse kontroll, probleemilahenduse harjutused. Kõike seda saad rakendada stažeerides instruktori juures erinevatel sukeldumiskursustel.
									</p>
									<p>
										Kursusele asumiseks pead olema vähemalt 18-ne, Rescue Diver ja sul peab olema logitud 60 sukeldumist.
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="efr" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								EFR Instruktori kursus
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p>
										EFRI kursus annab esmaabi oskajatele lisakoolituse, et õpetada esmaabivõtteid teistele. EFRI kursuse käigus õpid õpetama Emergency First Response Primary Care (CPR), Secondary Care (First Aid) ja Care for Children kursuseid.
									</p>
									<p>
										Kursus põhineb kandidaatide olemasolevatel esmaabi oskustel ja keskendub sealjuures instruktori oskustele. Iseseisva õppimise ja klassis toimuva treeningu käigus saavad Instruktori kandidaadid selgeks selle kuidas esmaabiprogramme õpetada.
									</p>
									<p>
										Need kes on mõne teise organisatsiooni esmaabiinstruktorid võivad vajalike moodulite sooritamisega saada omale ka Emergency First Response Instruktori nimetuse.
									</p>
									<p>
										<strong>Kursusele asumiseks</strong> pead olema sooritanud täiskasvanute ja laste esmaabi kursuse viimse 24 kuu jooksul ja olema vähemalt 18 aastane
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="idc" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								PADI IDC
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p class="font-semibold">
										Kui ihkad elukutset, milles on piiramatult võimalusi ja väljakutseid.
									</p>
									<p>
										Kui otsid ala, kus töö ja lõbu käivad käsikäes, siis on sukeldumisinstruktori karjäär just sinu jaoks. Lisaks sellele, et saad ise avastada meie planeedi "sisekosmost", uurida selle elu ja elukaid – on sukeldumisprofil ka võimalus ja au seda teistele näidata ja õpetada.
									</p>
									<p>
										Mõelda vaid – teed oma tööd sellises keskkonnas ja selliste vaatepiltide keskel, mida kunstnikud saavad vaid ette kujutada. Sulle makstakse selle eest, et teed seda mis sulle üle kõige meeldib ja oled teiste sukeldujate poolt austatud pealekauba.
									</p>
									<p>
										<strong>Instruktorikursus (IDC) koosneb kahest osast:</strong><br>
										AI ja OWSI programmidest. Need kokku moodustavad kursuse, mille järel saad sooritada instruktorieksami ja oledki PADI Open Water Scuba Instructor. IDC (Instructor Development Course) eesmärgiks on valmistada sind ette tööks sukeldumisinstruktorina.
									</p>
									<p>
										Kursusel saad põhjaliku ülevaate PADI standarditest, protseduuridest, filosoofiast, õpetamismeetoditest. Õpid, kuidas juhendada kõiki PADI sukeldumiskursusi, kasutada PADI õppemateriale ja tervet PADI õpetussüsteemi selleks, et anda teadmisi sukeldumishuvilistele ja sukeldujatele.
									</p>
									<div>
										<p><strong>IDC (Instructor Development Course) kursusele asumiseks pead:</strong></p>
										<ul class="list-disc list-inside space-y-1">
											<li>olema PADI Divemaster,</li>
											<li>omama sukeldujalitsentsi vähemalt 6 kuud,</li>
											<li>olema sooritanud vähemalt 60 sukeldumist,</li>
											<li>olema sukeldumiseks hea tervisega (signeeritud arstitõend),</li>
											<li>oskama esmaabi (esmaabi kursus viimase 24 kuu jooksul),</li>
											<li>unistama põnevast karjäärist.</li>
										</ul>
									</div>
									<p class="font-semibold">
										BE QUALIFIED NOT ONLY CERTIFIED!!!<br>
										Omanda kvalifikatsioon, mitte ainult litsents!!!
									</p>
									<p>
										Mitte instruktorieksami sooritamine pole eesmärgiks vaid sinu edu instruktorina. Aga eksam tuleb ikka sooritada. Instruktorieksami korraldab ja viib läbi PADI poolt määratud eksamineerija.
									</p>
									<p>
										OWSI-l on õigus läbi viia kõiki PADI sukeldujate kursusi, litsenseerida sukeldujaid alates sukeldumisproovidest (DiscoverScubaDiving) kuni Divemasterini. Kui kursuse edukalt lõpetad saad suvel juba ise õpetada ja sukeldujaid sertifitseerida.
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="ndl-instructor" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								NDL SCUBA DIVING INSTRUCTOR
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<h4 class="font-semibold">Instruktori kursuse kava:</h4>
									
									<div>
										<h5 class="font-medium">1 päev:</h5>
										<ul class="list-disc list-inside ml-4 space-y-1">
											<li>Teoreetiline osa nr 1.</li>
											<li>Teoreetiline osa nr 2.</li>
											<li>Teoreetiline osa nr 3.</li>
											<li>Teoreetiline osa nr 4.</li>
											<li>Instruktori kandidaatidel valmistada ette vähemalt kaks akadeemilise teooriatunni esitlust. Esitluste kontroll ja vigade analüüs.</li>
											<li>Instruktori kandidaatidel valmistuda läbi viima teooriatunni esitlust klassiruumis järgmisel päeval.</li>
										</ul>
									</div>

									<div>
										<h5 class="font-medium">2 päev:</h5>
										<ul class="list-disc list-inside ml-4 space-y-1">
											<li>Kodutöö kontroll (esitlus klassis). Vigade analüüs.</li>
											<li>Praktilised ülesanded nr 1.</li>
											<li>Teoreetiline osa nr 5.</li>
											<li>Teoreetiline osa nr 6.</li>
											<li>Instruktori kandidaatidel valmistada ette akadeemilise teooriatunni esitlus (vähemalt 1 esitlus). Vigade analüüs.</li>
											<li>Praktilised ülesanded nr 1.</li>
											<li>Instruktori kandidaatidel valmistada ette järgmiseks päevaks akadeemiline esitlus klassis ja praktiline esitlus vees).</li>
										</ul>
									</div>

									<div>
										<h5 class="font-medium">3 päev:</h5>
										<ul class="list-disc list-inside ml-4 space-y-1">
											<li>Kodutöö kontroll (esitlus klassis ja vees). Vigade analüüs.</li>
											<li>Teoreetiline osa nr 7.</li>
											<li>Teoreetiline osa nr 8.</li>
											<li>Instruktori kandidaatidel valmistada ette akadeemilise teooriatunni esitlus (vähemalt 1 esitlus). Vigade analüüs.</li>
											<li>Praktilised ülesanded nr 2.</li>
											<li>Instruktori kandidaatidel valmistada ette järgmiseks päevaks akadeemiline esitlus klassis ja praktiline esitlus vees.</li>
										</ul>
									</div>

									<div>
										<h5 class="font-medium">4. päev:</h5>
										<ul class="list-disc list-inside ml-4 space-y-1">
											<li>Kodutöö kontroll (esitlus klassis ja vees). Vigade analüüs.</li>
											<li>Teoreetiline osa nr 9.</li>
											<li>Teoreetiline osa nr 10.</li>
											<li>Instruktori kandidaatidel valmistada ette akadeemilise teooriatunni esitlus (vähemalt 1 esitlus). Vigade analüüs.</li>
											<li>Praktilised ülesanded nr 2.</li>
											<li>Instruktori kandidaatidel valmistada ette järgmiseks päevaks akadeemiline esitlus klassis ja praktiline esitlus vees).</li>
										</ul>
									</div>

									<div>
										<h5 class="font-medium">5. päev:</h5>
										<ul class="list-disc list-inside ml-4 space-y-1">
											<li>Kodutöö kontroll (esitlus klassis ja vees). Vigade analüüs.</li>
											<li>Teoreetiline osa nr 11.</li>
											<li>Teoreetiline osa nr 12.</li>
											<li>Instruktori kandidaatidel valmistada ette akadeemilise teooriatunni esitlus (vähemalt 1 esitlus). Vigade analüüs.</li>
											<li>Praktilised ülesanded nr 2.</li>
											<li>Instruktori kandidaatidel valmistada ette järgmiseks päevaks akadeemiline esitlus klassis ja praktiline esitlus vees).</li>
										</ul>
									</div>

									<div>
										<h5 class="font-medium">6. päev:</h5>
										<ul class="list-disc list-inside ml-4 space-y-1">
											<li>Kodutöö kontroll ja vigade analüüs.</li>
											<li>Teoreetiline osa nr 13.</li>
											<li>Instruktori kandidaatidel valmistada ette akadeemilise teooriatunni esitlus (vähemalt 2 esitlus). Vigade analüüs.</li>
											<li>Praktilised ülesanded nr 2.</li>
										</ul>
									</div>

									<div>
										<h5 class="font-medium">7. päev:</h5>
										<ul class="list-disc list-inside ml-4 space-y-1">
											<li>Praktilise osa eksam.</li>
											<li>Teooria eksam.</li>
										</ul>
									</div>
								</div>
							</Accordion.Content>
						</Accordion.Item>

						<Accordion.Item value="ndl-rank2" class="border border-gray-200 rounded-lg">
							<Accordion.Trigger class="px-6 py-4 text-left font-semibold text-lg hover:bg-gray-50">
								NDL SCUBA DIVING INSTRUCTOR RANK II
							</Accordion.Trigger>
							<Accordion.Content class="px-6 pb-6">
								<div class="space-y-4 text-gray-700">
									<p>
										Kui otsid ala, kus töö ja lõbu käivad käsikäes, siis on sukeldumisinstruktori karjäär just sinu jaoks. Lisaks sellele, et saad ise avastada meie planeedi "sisekosmost", uurida selle elu ja elukaid – on sukeldumisprofil ka võimalus ja au seda teistele näidata ja õpetada.
									</p>
									<p>
										Mõelda vaid – teed oma tööd sellises keskkonnas ja selliste vaatepiltide keskel, mida kunstnikud saavad vaid ette kujutada. Sulle makstakse selle eest, et teed seda mis sulle üle kõige meeldib ja oled teiste sukeldujate poolt austatud pealekauba.
									</p>
									<p>
										<strong>NDL Instruktorikursus koosneb kahest osast:</strong><br>
										RANK I ja RANK II programmidest. Need kokku moodustavad kursuse, mille järel saad sooritada instruktorieksami ja oledki NDL RANK II INSTRUKTOR. Kursuse eesmärgiks on valmistada sind ette tööks sukeldumisinstruktorina.
									</p>
									<p>
										Kursusel saad põhjaliku ülevaate NDL-i standarditest, protseduuridest, filosoofiast, õpetamismeetoditest. Õpid, kuidas juhendada kõiki NDL-i sukeldumiskursusi, kasutada NDL-i õppemateriale ja tervet NDL-i õpetussüsteemi selleks, et anda teadmisi sukeldumishuvilistele ja sukeldujatele.
									</p>
									<div>
										<p><strong>NDL INSTRUKTORI kursusele asumiseks pead:</strong></p>
										<ul class="list-disc list-inside space-y-1">
											<li>olema NDL (või mõne teise sukeldumisorganisatsiooni) Divemaster,</li>
											<li>omama sukeldujalitsentsi vähemalt 6 kuud,</li>
											<li>olema sooritanud vähemalt 60 sukeldumist,</li>
											<li>olema sukeldumiseks hea tervisega (signeeritud arstitõend),</li>
											<li>oskama esmaabi (esmaabi kursus viimase 24 kuu jooksul),</li>
											<li>unistama põnevast karjäärist.</li>
										</ul>
									</div>
									<p>
										Omanda kvalifikatsioon, mitte ainult litsents!!!
									</p>
									<p>
										Mitte instruktorieksami sooritamine pole eesmärgiks vaid sinu edu instruktorina. Aga eksam tuleb ikka sooritada. Instruktorieksami korraldab ja viib läbi NDL-i poolt määratud eksamineerija.
									</p>
									<p>
										Instruktor RANK II võib läbi viia kõiki NDL-i sukeldujate kursusi, litsenseerida sukeldujaid alates sukeldumisproovidest kuni Divemasterini. Kui kursuse edukalt lõpetad saad juba ise õpetada ja sukeldujaid sertifitseerida.
									</p>
									<p>
										Koolitusest huvitumise korral võta ühendust ja lepi sulle sobiv koolituse aeg kokku.
									</p>
									<p>
										Küsimuste korral võite meiega julgelt ühendust võtta.
									</p>
									<p class="font-semibold">
										Instruktori koolituse hind on 2000€
									</p>
								</div>
							</Accordion.Content>
						</Accordion.Item>
					</Accordion.Root>
				</div>

				<!-- Contact Call-out -->
				<div class="flex items-start gap-3 p-4 bg-white border border-orange-200 rounded-lg">
					<Info class="flex-shrink-0 w-5 h-5 text-orange-600 mt-0.5" />
					<p class="text-gray-700">
						Kui Sa ei leia aktiivselt toimuvat kursust meie üritustekalendrist, võta meiega julgelt ühendust ja leiame koos lahenduse!
					</p>
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
