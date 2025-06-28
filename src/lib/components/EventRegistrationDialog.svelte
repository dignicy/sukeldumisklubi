<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import * as Select from "$lib/components/ui/select";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Progress } from "$lib/components/ui/progress";
	import { Loader2, CheckCircle, AlertCircle, Users, Mail, Phone, FileText } from "lucide-svelte";
	import { pb } from "$lib/pocketbase/client";
	import type { DiveEvent } from "$lib/types/events";

	interface Props {
		event: DiveEvent;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { event, open, onOpenChange }: Props = $props();

	// Form state
	let formData = $state({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		emergencyPhone: '',
		experienceLevel: 'beginner',
		specialRequests: ''
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);
	let submitError = $state('');
	let countdownProgress = $state(0);
	let countdownSeconds = $state(0);

	// Reset form when dialog opens
	$effect(() => {
		if (open) {
			// Reset form data
			formData = {
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				emergencyPhone: '',
				experienceLevel: 'beginner',
				specialRequests: ''
			};
			submitSuccess = false;
			submitError = '';
			countdownProgress = 0;
			countdownSeconds = 0;
		}
	});

	function getExperienceLevelLabel(value: string): string {
		switch (value) {
			case 'beginner': return 'Algaja';
			case 'intermediate': return 'Kesktase';
			case 'advanced': return 'Kogenud';
			default: return 'Algaja';
		}
	}

	async function handleSubmit() {
		// Validate required fields
		if (!formData.firstName || !formData.lastName || !formData.email) {
			submitError = 'Palun täitke kõik nõutud väljad.';
			return;
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			submitError = 'Palun sisestage kehtiv e-posti aadress.';
			return;
		}

		isSubmitting = true;
		submitError = '';

		try {
			// First, create or find the client
			let client;
			
			// Try to find existing client
			try {
				client = await pb.collection('clients').getFirstListItem(`email="${formData.email}"`);
			} catch (searchError) {
				
				// Create new client with detailed logging
				const clientData = {
					email: formData.email,
					first_name: formData.firstName,
					last_name: formData.lastName,
					phone: formData.phone || '',
					emergency_phone: formData.emergencyPhone || ''
				};
				

				
							try {
				// First check if client exists
				const existingClients = await pb.collection('clients').getList(1, 1, {
					filter: `email = "${formData.email}"`
				});

				if (existingClients.items.length > 0) {
					client = existingClients.items[0];
				} else {
					// Create new client with all required fields
					const clientData: any = {
						email: formData.email,
						first_name: formData.firstName,
						last_name: formData.lastName,
						phone: formData.phone || '' // Required field, use empty string if not provided
					};

					// Add emergency_phone only if provided (it's optional)
					if (formData.emergencyPhone.trim()) {
						clientData.emergency_phone = formData.emergencyPhone;
					}

					client = await pb.collection('clients').create(clientData);
				}
			} catch (createError: any) {
				console.error('Failed to create/find client:', createError);
				console.error('Error status:', createError.status);
				console.error('Error data:', createError.data);
				console.error('Error message:', createError.message);
				
				// Show user-friendly error
				if (createError.data?.email) {
					submitError = 'See e-posti aadress on juba kasutusel.';
				} else {
					submitError = 'Kliendi andmete salvestamisel tekkis viga. Palun kontrollige kõiki nõutud välju ja proovige uuesti.';
				}
				return;
			}
			}

			// Prepare registration notes with all additional info
			const registrationNotes = [
				formData.experienceLevel ? `Kogemuste tase: ${getExperienceLevelLabel(formData.experienceLevel)}` : '',
				formData.specialRequests ? `Märkused: ${formData.specialRequests}` : ''
			].filter(Boolean).join('\n\n');

			// Create the registration
			await pb.collection('event_registrations').create({
				client: client.id,
				event: event.id,
				status: 'waiting_confirmation',
				notes: registrationNotes
			});

			submitSuccess = true;
			
			// Start countdown timer (8 seconds)
			const totalCountdownTime = 8;
			countdownSeconds = totalCountdownTime;
			countdownProgress = 0;
			
			const countdownInterval = setInterval(() => {
				countdownSeconds--;
				countdownProgress = ((totalCountdownTime - countdownSeconds) / totalCountdownTime) * 100;
				
				if (countdownSeconds <= 0) {
					clearInterval(countdownInterval);
					onOpenChange(false);
				}
			}, 1000);

		} catch (error: any) {
			console.error('Registration error:', error);
			console.error('Error details:', error.data);
			
			// Check for duplicate registration specifically
			if (error.message?.includes('event_registrations') && error.message?.includes('duplicate')) {
				submitError = 'Te olete juba sellele üritusele registreeritud.';
			} else if (error.status === 400) {
				// Handle validation errors more specifically
				if (error.data?.email) {
					submitError = 'E-posti aadressiga on probleem. Palun kontrollige ja proovige uuesti.';
				} else if (error.data) {
					submitError = `Vormi täitmisel tekkis viga: ${Object.keys(error.data).join(', ')}`;
				} else {
					submitError = 'Vormi andmetes on viga. Palun kontrollige kõiki välju.';
				}
			} else {
				submitError = 'Registreerimisel tekkis viga. Palun proovige uuesti või võtke meiega ühendust.';
			}
		} finally {
			isSubmitting = false;
		}
	}
</script>

<Dialog.Root {open} onOpenChange={onOpenChange}>
	<Dialog.Content class="max-w-md">
		<Dialog.Header>
			<Dialog.Title class="flex items-center gap-2">
				<Users class="h-5 w-5 text-orange-500" />
				Registreerimine
			</Dialog.Title>
			<Dialog.Description>
				{event.title}
			</Dialog.Description>
		</Dialog.Header>

		{#if submitSuccess}
			<!-- Success State -->
			<div class="py-8 text-center">
				<CheckCircle class="h-16 w-16 text-green-500 mx-auto mb-4" />
				<h3 class="text-lg font-semibold text-gray-900 mb-2">Registreerimine õnnestus!</h3>
				<p class="text-gray-600 mb-6">
					Võtame teiega peagi ühendust registreeringu kinnitamiseks.
				</p>
				
				<!-- Countdown Progress -->
				<div class="space-y-3">
					<div class="flex items-center justify-center gap-2 text-sm text-gray-500">
						<span>Dialoog sulgub automaatselt</span>
						<span class="font-medium text-orange-600">{countdownSeconds}s</span>
						<span>pärast</span>
					</div>
					<Progress 
						value={countdownProgress} 
						max={100} 
						class="w-full h-2" 
					/>
				</div>
				
				<!-- Manual close option -->
				<div class="mt-6">
					<Button 
						variant="outline" 
						size="sm"
						onclick={() => onOpenChange(false)}
						class="text-gray-600 hover:text-gray-900"
					>
						Sulge kohe
					</Button>
				</div>
			</div>
		{:else}
			<!-- Registration Form -->
			<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
				<!-- Personal Info -->
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="firstName">Eesnimi *</Label>
						<Input
							id="firstName"
							bind:value={formData.firstName}
							placeholder="Teie eesnimi"
							required
							disabled={isSubmitting}
						/>
					</div>
					<div class="space-y-2">
						<Label for="lastName">Perekonnanimi *</Label>
						<Input
							id="lastName"
							bind:value={formData.lastName}
							placeholder="Teie perekonnanimi"
							required
							disabled={isSubmitting}
						/>
					</div>
				</div>

				<!-- Contact Info -->
				<div class="space-y-2">
					<Label for="email">E-post *</Label>
					<div class="relative">
						<Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							id="email"
							type="email"
							bind:value={formData.email}
							placeholder="teie@email.ee"
							class="pl-10"
							required
							disabled={isSubmitting}
						/>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="phone">Telefon *</Label>
					<div class="relative">
						<Phone class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							id="phone"
							type="tel"
							bind:value={formData.phone}
							placeholder="+372 5XXX XXXX"
							class="pl-10"
							required
							disabled={isSubmitting}
						/>
					</div>
				</div>

				<div class="space-y-2">
					<Label for="emergencyPhone">Hädaolukorra kontakt</Label>
					<div class="relative">
						<Phone class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
						<Input
							id="emergencyPhone"
							type="tel"
							bind:value={formData.emergencyPhone}
							placeholder="+372 5XXX XXXX"
							class="pl-10"
							disabled={isSubmitting}
						/>
					</div>
				</div>

				<!-- Experience Level -->
				<div class="space-y-2">
					<Label for="experienceLevel">Kogemuste tase</Label>
					<Select.Root type="single" bind:value={formData.experienceLevel}>
						<Select.Trigger>
							{getExperienceLevelLabel(formData.experienceLevel)}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="beginner">Algaja</Select.Item>
							<Select.Item value="intermediate">Kesktase</Select.Item>
							<Select.Item value="advanced">Kogenud</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>

				<!-- Special Requests -->
				<div class="space-y-2">
					<Label for="specialRequests">Eritingimused või märkused</Label>
					<Textarea
						id="specialRequests"
						bind:value={formData.specialRequests}
						placeholder="Toitumispiirangud, allergiad, eritingimused..."
						class="min-h-[80px]"
						disabled={isSubmitting}
					/>
				</div>

				<!-- Error Message -->
				{#if submitError}
					<div class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
						<AlertCircle class="h-4 w-4 text-red-500 flex-shrink-0" />
						<p class="text-sm text-red-700">{submitError}</p>
					</div>
				{/if}

				<!-- Footer -->
				<Dialog.Footer class="flex gap-2">
					<Button 
						type="button" 
						variant="outline" 
						onclick={() => onOpenChange(false)}
						disabled={isSubmitting}
					>
						Tühista
					</Button>
					<Button 
						type="submit" 
						class="bg-orange-500 hover:bg-orange-600"
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							<Loader2 class="h-4 w-4 mr-2 animate-spin" />
							Registreerimas...
						{:else}
							<Users class="h-4 w-4 mr-2" />
							Registreeru
						{/if}
					</Button>
				</Dialog.Footer>
			</form>
		{/if}
	</Dialog.Content>
</Dialog.Root> 