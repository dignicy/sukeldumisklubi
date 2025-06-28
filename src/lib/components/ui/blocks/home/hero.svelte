<script lang="ts">
	import { Star } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
	import { ArrowRight } from "lucide-svelte";
</script>

<!-- Hero Section -->
<section class="relative flex items-center justify-center overflow-hidden bg-white py-4 px-4 min-h-screen">
    <!-- Card Container -->
    <div class="relative w-full max-w-screen bg-black rounded-3xl overflow-hidden min-h-[calc(100vh-2rem)]">
        <!-- Background -->
        <div class="absolute inset-0 z-0">
            <img
                src="/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp"
                alt="Sukeldumisklubi veealune taust"
                class="w-full h-full object-cover"
                loading="eager"
                decoding="async"
                draggable="false"
            />
            <!-- Black overlay -->
            <div class="absolute inset-0 bg-black/50"></div>
        </div>
        
        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-2rem)] flex items-center justify-start">
            <div class="container mx-auto px-6 lg:px-8 w-full">
                <div class="max-w-xl">
                    <div class="inline-flex items-center border border-white text-white bg-transparent rounded-full text-sm font-medium mb-8 animate-fade-in-up px-4 py-2 w-fit">
                        <Star class="h-4 w-4 mr-2 text-white" />
                        25+ aastat kogemust sukeldumises
                    </div>
                    
                    <h1 class="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight animate-fade-in-up text-left" style="animation-delay: 0.1s">
                        Ära ole pinnapealne
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-white mb-12 leading-relaxed animate-fade-in-up text-left" style="animation-delay: 0.2s">
                        Professionaalsed sukeldumiskursused, kvaliteetne varustus ja unustamatud reisid
                        koos Eesti kogenuima meeskonnaga saavad alguse siit.
                    </p>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-start animate-fade-in-up" style="animation-delay: 0.3s">
                        <Button size="lg" class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl h-auto">
                            Alusta sukeldumisega
                            <ArrowRight class="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" class="border-white text-black hover:bg-white hover:text-black px-8 py-4 rounded-xl h-auto">
                            Vaata koolitusi
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>