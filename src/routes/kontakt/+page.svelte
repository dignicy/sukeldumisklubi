<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	// Form action result
	export let form: ActionData;

	// Page data configuration
	const pageData = {
		title: 'Kontakt',
		subtitle:
			'Meie meeskond on valmis vastama kõikidele teie küsimustele sukeldumise kohta.',
		heroImage: '/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp'
	};

	// Contact information
	const contactInfo = {
		address: 'Õnne 43, Tartu linn, 50106',
		hours: 'E-R 10.00 - 18.00',
		phone: '(+372) 5300 0008',
		email: 'info@sukeldumisklubi.ee'
	};

	// Form state
	let isSubmitting = false;
</script>

<svelte:head>
	<title>{pageData.title} - Sukeldumiskeskus</title>
	<meta name="description" content={pageData.subtitle} />
</svelte:head>

<!-- Hero Section -->
<section
	class="relative flex h-[400px] items-center justify-center overflow-hidden bg-white px-4 py-4 md:h-[500px]"
>
	<div class="max-w-screen relative h-full w-full overflow-hidden rounded-3xl bg-black">
		<!-- Background -->
		<div class="absolute inset-0 z-0">
			<img
				src={pageData.heroImage}
				alt={pageData.title}
				class="h-full w-full object-cover"
				loading="eager"
			/>
			<div class="absolute inset-0 bg-black/50"></div>
		</div>

		<!-- Content Overlay -->
		<div class="absolute bottom-0 left-0 right-0 z-10 p-8">
			<div class="mx-auto max-w-7xl px-6">
				<div class="max-w-4xl">
					<h1 class="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
						{pageData.title}
					</h1>

					<p class="max-w-3xl text-xl text-blue-100">
						{pageData.subtitle}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Main Content -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid gap-16 lg:grid-cols-3">
			<!-- Contact Form -->
			<div class="space-y-8 lg:col-span-2">
				<div class="space-y-6">
					<h2 class="text-3xl font-bold text-gray-900">Saada meile sõnum</h2>
					<p class="text-lg text-gray-600">
						Täida vorm allpool ja me võtame teiega ühendust esimesel võimalusel. 
						Vastame tavaliselt 24 tunni jooksul.
					</p>
				</div>

				<Card class="border-gray-200">
					<CardHeader>
						<CardTitle class="flex items-center gap-2 text-xl text-gray-900">
							<MessageCircle class="h-5 w-5 text-orange-600" />
							Kontaktivorm
						</CardTitle>
						<CardDescription class="text-gray-600">
							Küsimused, broneeringud või lihtsalt soov rohkem teada saada - kirjuta meile!
						</CardDescription>
					</CardHeader>
					<CardContent>
						<!-- Success Message -->
						{#if form?.success}
							<div class="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
								<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
									<svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
									</svg>
								</div>
								<h3 class="text-lg font-semibold text-green-900 mb-2">Sõnum saadetud!</h3>
								<p class="text-green-700">{form.message}</p>
							</div>
						{:else}
							<!-- Error Message -->
							{#if form?.error}
								<div class="rounded-xl border border-red-200 bg-red-50 p-4 mb-6">
									<div class="flex">
										<svg class="h-5 w-5 text-red-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
										</svg>
										<div class="ml-3">
											<p class="text-sm text-red-800">{form.error}</p>
										</div>
									</div>
								</div>
							{/if}

							<form 
								method="POST" 
								use:enhance={() => {
									isSubmitting = true;
									return async ({ update }) => {
										await update();
										isSubmitting = false;
									};
								}}
								class="space-y-6"
							>
								<div class="grid gap-4 md:grid-cols-2">
									<div class="space-y-2">
										<Label for="name" class="text-sm font-medium text-gray-900">Nimi *</Label>
										<Input
											id="name"
											name="name"
											placeholder="Teie nimi"
											required
											class="h-12"
										/>
									</div>
									<div class="space-y-2">
										<Label for="email" class="text-sm font-medium text-gray-900">E-mail *</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="teie@email.ee"
											required
											class="h-12"
										/>
									</div>
								</div>

								<div class="grid gap-4 md:grid-cols-2">
									<div class="space-y-2">
										<Label for="phone" class="text-sm font-medium text-gray-900">Telefon</Label>
										<Input
											id="phone"
											name="phone"
											type="tel"
											placeholder="+372 5..."
											class="h-12"
										/>
									</div>
									<div class="space-y-2">
										<Label for="subject" class="text-sm font-medium text-gray-900">Teema *</Label>
										<Input
											id="subject"
											name="subject"
											placeholder="Sõnumi teema"
											required
											class="h-12"
										/>
									</div>
								</div>

								<div class="space-y-2">
									<Label for="message" class="text-sm font-medium text-gray-900">Sõnum *</Label>
									<Textarea
										id="message"
										name="message"
										placeholder="Kirjutage siia oma sõnum..."
										required
										rows={6}
										class="min-h-[120px]"
									/>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting}
									class="h-12 w-full rounded-xl bg-orange-500 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
								>
									{isSubmitting ? 'Saadan...' : 'Saada sõnum'}
								</Button>
							</form>
						{/if}
					</CardContent>
				</Card>
			</div>

			<!-- Contact Information Sidebar -->
			<div class="h-fit space-y-6 lg:sticky lg:top-28">
				<!-- Contact Details -->
				<div
					class="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-orange-50 p-6"
				>
					<h3 class="mb-3 text-xl font-bold text-gray-900">Kontaktandmed</h3>
					<p class="mb-5 text-sm text-gray-600">Meil on hea meel teiega ühendust võtta!</p>

					<div class="mb-6 space-y-4">
						<div class="flex items-start text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100 mt-1">
								<MapPin class="h-3 w-3 text-orange-600" />
							</div>
							<div>
								<span class="text-sm font-medium text-gray-900 block">Aadress</span>
								<span class="text-sm">{contactInfo.address}</span>
							</div>
						</div>

						<div class="flex items-start text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100 mt-1">
								<Clock class="h-3 w-3 text-orange-600" />
							</div>
							<div>
								<span class="text-sm font-medium text-gray-900 block">Lahtiolekuajad</span>
								<span class="text-sm">{contactInfo.hours}</span>
							</div>
						</div>

						<div class="flex items-start text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100 mt-1">
								<Phone class="h-3 w-3 text-orange-600" />
							</div>
							<div>
								<span class="text-sm font-medium text-gray-900 block">Telefon</span>
								<a href="tel:{contactInfo.phone}" class="text-sm hover:text-orange-600">
									{contactInfo.phone}
								</a>
							</div>
						</div>

						<div class="flex items-start text-gray-600">
							<div class="mr-3 flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100 mt-1">
								<Mail class="h-3 w-3 text-orange-600" />
							</div>
							<div>
								<span class="text-sm font-medium text-gray-900 block">E-mail</span>
								<a href="mailto:{contactInfo.email}" class="text-sm hover:text-orange-600">
									{contactInfo.email}
								</a>
							</div>
						</div>
					</div>

					<!-- Direct Contact Button -->
					<a href="tel:{contactInfo.phone}" class="block">
						<Button
							class="h-12 w-full rounded-xl bg-orange-500 text-sm font-medium text-white hover:bg-orange-600"
						>
							<Phone class="mr-2 h-4 w-4" />
							Helista kohe
						</Button>
					</a>
				</div>

				

				<!-- Events Link -->
				<div class="relative overflow-hidden rounded-2xl bg-gray-100">
					<img 
						src="/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp" 
						alt="Sukeldumise pilt" 
						class="h-48 w-full object-cover" 
					/>
					<div class="absolute bottom-4 left-4 right-4">
						<a href="/uritused" class="block">
							<Button
								class="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30"
							>
								<Calendar class="mr-2 h-4 w-4" />
								Vaata üritustekalendrit
							</Button>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
