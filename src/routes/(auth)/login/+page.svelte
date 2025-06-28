<script lang="ts">
	import Alert from '@/components/ui/alert/alert.svelte';
	import { Button } from '@/components/ui/button';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import UserLoginForm from '@/user-login-form.svelte';

	export let form;
</script>

<!-- Login Section with Hero Styling -->
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
            <div class="absolute inset-0 bg-black/60"></div>
        </div>
        
        <!-- Register Button -->
        <Button
            href="/"
            variant="outline"
            class="absolute left-6 top-6 z-20 border-white text-black hover:bg-black hover:text-white"
        >
            Back to home
        </Button>
        
        <!-- Content -->
        <div class="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-2rem)] flex items-center justify-center">
            <div class="container mx-auto px-6 lg:px-8 w-full max-w-md">
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                    
                    <!-- Login Form -->
                    <div class="space-y-6">
                        <div class="text-center">
                            <h2 class="text-xl font-semibold text-white mb-2">Login to your account</h2>
                            <p class="text-white/70 text-sm">
                                Enter your credentials to access your account
                            </p>
                        </div>
                        
                        <UserLoginForm class="w-full" />
                        
                        {#if form?.errorMessage}
                            <Alert class="bg-red-500/20 border-red-400 text-white">
                                {form?.errorMessage}
                            </Alert>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
		opacity: 0;
	}
</style>
