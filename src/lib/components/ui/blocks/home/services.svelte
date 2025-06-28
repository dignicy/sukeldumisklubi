<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { CheckCircle, Users, Waves, Compass } from 'lucide-svelte';

	// Content data
	const servicesData = {
		header: {
			title: "Tule avasta veealust elu koos meie toreda kollektiiviga",
			description: "Meie sukeldumisklubi on tegutsenud aastast 1999. Pika tegutsemisaja jooksul on meie instruktorid õpetanud sukeldumist väga paljudele, paljudest nendest on nüüdseks saanud meie instruktorite abilised DM-id ja instruktorid. Meie instruktorid pakuvad PADI ja IANTD organisatsioonide koolitusi alates algõppest kuni profisukeldujani."
		},
		services: [
			{
				id: "koolitused",
				title: "Professionaalsed sukeldumiskursused",
				layout: "image-left", // image-left or content-left
				icon: Users,
				iconPosition: "bottom-right", // bottom-right or bottom-left
				image: {
					src: "/photos/algaja.png",
					alt: "Professionaalsed sukeldumise koolitused PADI ja IANTD sertifikaatidega"
				},
				description: [
					"Pakume PADI ja IANTD sertifitseeritud kursusi kõigil tasemetel – alates esimesest veealusest hingetõmbest kuni tehnilise sukeldumise meisterlikkuseni. Meie kogenud instruktorid tagavad turvalise ja põhjaliku õppimiskogemuse, kus iga õpilane saab individuaalset tähelepanu ja toetust."
				],
				features: [
					"Proovisukeldumine bassenis",
					"Open Water kursused", 
					"Advanced & Rescue kursused",
					"Tehniline sukeldumine"
				],
				buttons: {
					primary: {
						text: "Tutvu koolitustega",
						variant: "default"
					},
					secondary: {
						text: "Broneeri proovisukeldumine",
						variant: "outline"
					}
				}
			},
			{
				id: "varustus",
				title: "Kvaliteetne sukeldumisvarustus",
				layout: "content-left",
				icon: Waves,
				iconPosition: "bottom-left",
				image: {
					src: "/photos/varustus.png",
					alt: "Kvaliteetne sukeldumisvarustus müük, rent ja hooldus"
				},
				description: [
					"Meie varustusepoes leiad kõike vajalikku ohutuks ja mugavaks sukeldumiseks. Müüme ainult kvaliteetseid tooteid tunnustatud tootjatelt ja pakume ka varustuse renti neile, kes soovivad enne ostu proovida või vajjavad varustust ainult üksikuteks sukeldumisteks."
				],
				features: [
					"Regulaatorid ja BCD",
					"Kostüümid ja neopreen",
					"Maskid, snorklid, ujurid",
					"Hooldus ja remont"
				],
				buttons: {
					primary: {
						text: "Tutvu varustusega",
						variant: "default"
					},
					secondary: {
						text: "Küsi hinnapakkumist",
						variant: "outline"
					}
				}
			},
			{
				id: "reisid",
				title: "Unustamatud sukeldumisreisid",
				layout: "image-left",
				icon: Compass,
				iconPosition: "bottom-right",
				image: {
					src: "/photos/india-o-safari.png",
					alt: "Unustamatute sukeldumisreiside korraldamine maailma ilusamatesse kohtadesse"
				},
				description: [
					"Korraldame põnevaid sukeldumisreiside maailma kõige maagilisematesse veealustesse paikadesse. Meie reisid on hoolikalt planeeritud, et pakkuda nii algajatele kui ka kogenud sukeldujatele unustamatuid elamusi ja võimalust avastada uusi sukeldumiskohti koos meie toreda seltskonnaga."
				],
				features: [
					"Punase mere safari",
					"Troopilised sukeldumised",
					"Kilpkonnadega sukeldumine",
					"Väikesed grupireisid"
				],
				buttons: {
					primary: {
						text: "Vaata üritustekalendrit",
						variant: "default"
					},
					secondary: {
						text: "Küsi reisiinfot",
						variant: "outline"
					}
				}
			}
		]
	};
</script>

<!-- Services Section -->
<section id="teenused" class="bg-white mt-32 mb-24">
	<div class="container mx-auto px-6">
		<!-- Section Header -->
		<div class="mx-auto mb-20 max-w-4xl text-center">
			<h2 class="mb-6 text-5xl font-bold text-gray-900">
				{servicesData.header.title}
			</h2>
			<p class="text-xl leading-relaxed text-gray-600">
				{servicesData.header.description}
			</p>
		</div>

		<!-- Services -->
		{#each servicesData.services as service, index}
			<div class="mb-40 {index === servicesData.services.length - 1 ? 'mb-16' : ''}">
				<div class="grid items-center gap-16 lg:grid-cols-2">
					<!-- Image -->
					<div class="relative {service.layout === 'content-left' ? 'order-1 lg:order-2' : ''}">
						<div class="overflow-hidden rounded-3xl bg-gray-200 shadow-2xl">
							<img
								src={service.image.src}
								alt={service.image.alt}
								class="h-96 w-full object-cover {service.id === 'koolitused' ? 'object-top' : ''} transition-transform duration-700 hover:scale-105"
							/>
						</div>
						<div class="absolute {service.iconPosition === 'bottom-left' ? '-bottom-6 -left-6' : '-bottom-6 -right-6'} rounded-2xl bg-blue-400/50 backdrop-blur-lg p-4 text-white shadow-xl">
							<svelte:component this={service.icon} class="h-8 w-8" />
						</div>
					</div>

					<!-- Content -->
					<div class="space-y-8 {service.layout === 'content-left' ? 'order-2 lg:order-1' : ''}">
						<div class="space-y-4">
							<h2 class="text-4xl font-bold text-gray-900">{service.title}</h2>
							{#each service.description as paragraph}
								<p class="text-md leading-relaxed text-gray-600">
									{paragraph}
								</p>
							{/each}
						</div>

						<div class="grid gap-4 sm:grid-cols-2">
							{#each service.features as feature}
								<div class="flex items-center space-x-3">
									<CheckCircle class="h-5 w-5 flex-shrink-0 text-orange-600" />
									<span class="text-gray-700">{feature}</span>
								</div>
							{/each}
						</div>

						<div class="flex flex-col gap-3 sm:flex-row">
							<Button class="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-10 font-medium">
								{service.buttons.primary.text}
							</Button>
							<Button variant="outline" class="border-2 hover:bg-gray-50 rounded-xl h-10 font-medium">
								{service.buttons.secondary.text}
							</Button>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
