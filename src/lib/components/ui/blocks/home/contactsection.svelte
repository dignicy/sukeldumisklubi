<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { MapPin, Phone, Mail, Clock, Waves } from "lucide-svelte";
</script>

<!-- Contact Section -->
<section id="kontakt" class="py-32">
	<div class="container mx-auto px-6">
		<div class="max-w-6xl mx-auto">
			<div class="text-center mb-20">
				<h2 class="text-5xl font-bold mb-6 text-gray-900">
					Sinu mitmekülgne, põnev, lõbus ja unustamatu <span class="text-orange-500">sukeldumiskarjäär</span> võib alata.
				</h2>
				<p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
					Võta meiega ühendust ja alusta oma sukeldumiskarjääri juba täna.
				</p>
			</div>
			
			<div class="grid lg:grid-cols-2 gap-16 lg:items-stretch">
				<!-- Contact Info -->
				<div class="space-y-8">
					<div class="bg-white rounded-2xl p-8 shadow-lg flex flex-col">
						<h3 class="text-2xl font-semibold mb-8 text-gray-900">Sukeldumisklubi</h3>
						<div class="space-y-6">
							<div class="flex items-start space-x-6">
								<div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
									<MapPin class="h-7 w-7 text-orange-500" />
								</div>
								<div>
									<h4 class="font-semibold text-gray-900 mb-1">Aadress</h4>
									<p class="text-gray-600">Õnne 43, Tartu linn, 50106</p>
								</div>
							</div>
							
							<div class="flex items-start space-x-6">
								<div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
									<Phone class="h-7 w-7 text-orange-500" />
								</div>
								<div>
									<h4 class="font-semibold text-gray-900 mb-1">Telefon</h4>
									<p class="text-gray-600">(+372) 5300 0008</p>
								</div>
							</div>
							
							<div class="flex items-start space-x-6">
								<div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
									<Mail class="h-7 w-7 text-orange-500" />
								</div>
								<div>
									<h4 class="font-semibold text-gray-900 mb-1">E-post</h4>
									<p class="text-gray-600">info@sukeldumisklubi.ee</p>
								</div>
							</div>
							
							<div class="flex items-start space-x-6">
								<div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
									<Clock class="h-7 w-7 text-orange-500" />
								</div>
								<div>
									<h4 class="font-semibold text-gray-900 mb-1">Lahtiolekuajad</h4>
									<p class="text-gray-600">E-R 10:00 - 18:00</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<!-- CTA Card -->
				<div class="relative rounded-2xl overflow-hidden shadow-lg h-full">
					<!-- Background Image -->
					<div class="absolute inset-0 z-0">
						<img
							src="/photos/india-o-safari.png"
							alt="India Safari Sukeldumisklubi Reis"
							class="w-full h-full object-cover"
							loading="lazy"
							decoding="async"
							draggable="false"
						/>
						<!-- Dark overlay for better text readability -->
						<div class="absolute inset-0 bg-black/60"></div>
					</div>
					
					<!-- Content -->
					<div class="relative z-10 p-12 h-full flex flex-col justify-end">
						<div class="mb-8">
							<h3 class="text-3xl font-bold mb-6 text-white">Valmis alustama?</h3>
							<p class="text-white mb-8 text-lg leading-relaxed">
								Tule ja avasta koos meie kogenud kollektiiviga veealust elu.
								Sinu unustamatu sukeldumisseiklus algab siit!
							</p>
						</div>
						
						<div class="space-y-3">
							<Button href="/kontakt" class="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-10 font-medium">
								<Waves class="mr-2 h-4 w-4" />
								Broneeri proovisukeldumine
							</Button>
							<Button href="/uritused" variant="outline" class="w-full border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-xl h-10 font-medium bg-transparent">
								Vaata koolitusi
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>