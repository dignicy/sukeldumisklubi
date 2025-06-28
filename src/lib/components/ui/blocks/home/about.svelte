<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Award, ArrowRight, Users, Waves, Calendar } from "lucide-svelte";
</script>

<!-- About Section -->
<section id="meist" class="py-32 bg-gradient-to-br from-slate-50 to-blue-50">
	<div class="container mx-auto px-6">
		<div class="max-w-6xl mx-auto">
			<div class="grid lg:grid-cols-2 gap-16 items-center">
				<div>
					<div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
						<Award class="h-4 w-4 mr-2" />
						Alates 1999. aastast
					</div>
					
					<h2 class="text-5xl font-bold text-gray-900 mb-8 leading-tight">
						25 aastat 
						<span class="text-blue-600">kogemust</span>
					</h2>
					
					<p class="text-xl text-gray-600 mb-8 leading-relaxed">
						Meie sukeldumisklubi on Eesti sukeldumise valdkonna pioneere. Pika tegutsemisaja jooksul on 
						meie instruktorid õpetanud sukeldumist tuhandetele inimestele.
					</p>
					
					<p class="text-lg text-gray-600 mb-12 leading-relaxed">
						Paljudest meie õpilastest on nüüdseks saanud meie meeskonna liikmed - DM-id ja instruktorid, 
						kes jätkavad sukeldumise õpetamist järgmistele põlvkondadele.
					</p>
					
					<Button size="lg" class="bg-gray-900 hover:bg-gray-800 rounded-xl">
						Meie lugu
						<ArrowRight class="ml-2 h-5 w-5" />
					</Button>
				</div>
				
				<div class="space-y-8">
					<div class="bg-white rounded-2xl p-8 shadow-lg">
						<div class="flex items-start space-x-6">
							<div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
								<Award class="h-7 w-7 text-blue-600" />
							</div>
							<div>
								<h4 class="text-xl font-semibold text-gray-900 mb-2">PADI & IANTD sertifitseeritud</h4>
								<p class="text-gray-600">Rahvusvaheliselt tunnustatud koolitused ja sertifikaadid</p>
							</div>
						</div>
					</div>
					
					<div class="bg-white rounded-2xl p-8 shadow-lg">
						<div class="flex items-start space-x-6">
							<div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
								<Users class="h-7 w-7 text-emerald-600" />
							</div>
							<div>
								<h4 class="text-xl font-semibold text-gray-900 mb-2">500+ õpilast</h4>
								<p class="text-gray-600">Üle 500 eduka sukelduja koolitatud meie keskuses</p>
							</div>
						</div>
					</div>
					
					<div class="bg-white rounded-2xl p-8 shadow-lg">
						<div class="flex items-start space-x-6">
							<div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
								<Waves class="h-7 w-7 text-orange-600" />
							</div>
							<div>
								<h4 class="text-xl font-semibold text-gray-900 mb-2">Täielik teenus</h4>
								<p class="text-gray-600">Kursused, varustus ja reisid - kõik ühes kohas</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

