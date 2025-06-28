<script lang="ts">
    import { Separator } from "$lib/components/ui/separator";
</script>
<!-- Footer -->
<footer class="bg-black text-white py-16">
	<div class="container mx-auto px-6">
		<div class="max-w-6xl mx-auto">
			<div class="grid md:grid-cols-4 gap-12 mb-12">
				<div class="md:col-span-2">
					<h3 class="text-2xl font-bold mb-6">Sukeldumisklubi</h3>
					<p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
						Eesti juhtiv sukeldumiskeskus. Professionaalsed koolitused, 
						kvaliteetne varustus ja unustamatuid kogemusi alates 1999.
					</p>
				</div>
				
				<div>
					<h4 class="font-semibold mb-6 text-lg">Koolitused</h4>
					<ul class="space-y-3 text-gray-400">
						<li><a href="#" class="hover:text-white transition-colors">Proovisukeldumine</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Algaja kursused</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Edasijõudnu kursused</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Tehniline sukeldumine</a></li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-semibold mb-6 text-lg">Teenused</h4>
					<ul class="space-y-3 text-gray-400">
						<li><a href="#" class="hover:text-white transition-colors">Varustuse rent</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Sukeldumisreisid</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Hooldus</a></li>
						<li><a href="#" class="hover:text-white transition-colors">Konsultatsioon</a></li>
					</ul>
				</div>
			</div>
			
			<Separator class="bg-gray-800 mb-8" />
			
			<div class="flex flex-col md:flex-row justify-between items-center text-gray-400">
				<p>&copy; 2024 Sukeldumisklubi. Kõik õigused kaitstud.</p>
				<div class="flex space-x-8 mt-4 md:mt-0">
					<a href="#" class="hover:text-white transition-colors">Privaatsus</a>
					<a href="#" class="hover:text-white transition-colors">Tingimused</a>
				</div>
			</div>
		</div>
	</div>
</footer>