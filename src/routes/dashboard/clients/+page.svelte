<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Table from '$lib/components/ui/table';
	import { 
		Users, 
		Search, 
		ArrowLeft, 
		Mail,
		Phone,
		Eye,
		Calendar,
		UserCircle
	} from 'lucide-svelte';
	import type { PageData } from './$types';
	import type { ClientsResponse } from '$lib/pocketbase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Type for client with registration count
	type ClientWithStats = ClientsResponse & {
		registrationCount: number;
	};

	let { data }: { data: PageData } = $props();

	let searchTerm = $state('');
	let selectedClient = $state<ClientWithStats | null>(null);
	let showClientDialog = $state(false);
	let searchTimeout: number;

	// Cast the data items to the correct type
	const clients = $derived((data.clients.items as ClientWithStats[]) || []);

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('et-EE', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}

	function handleSearchInput() {
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(performSearch, 300); // 300ms debounce
	}

	function performSearch() {
		const url = new URL($page.url);
		if (searchTerm) {
			url.searchParams.set('search', searchTerm);
		} else {
			url.searchParams.delete('search');
		}
		goto(url.toString());
	}

	function viewClient(client: ClientWithStats) {
		selectedClient = client;
		showClientDialog = true;
	}

	// Initialize from URL params
	$effect(() => {
		searchTerm = $page.url.searchParams.get('search') ?? '';
	});
</script>

<svelte:head>
	<title>Klientide haldamine - Administraatori Töölaud</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<header class="bg-white shadow-sm border-b">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<div class="flex items-center">
					<Button href="/dashboard" variant="ghost" size="sm" class="mr-4">
						<ArrowLeft class="h-4 w-4 mr-2" />
						Tagasi
					</Button>
					<h1 class="text-2xl font-bold text-gray-900">Klientide haldamine</h1>
				</div>
				<Badge variant="secondary" class="!rounded-sm">
					{data.clients.totalItems} klienti
				</Badge>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Search -->
		<Card class="mb-6">
			<CardContent class="p-6">
				<div class="flex gap-4">
					<div class="flex-1">
						<div class="relative">
							<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<Input
								bind:value={searchTerm}
								placeholder="Otsi nime, e-posti või telefoninumbri järgi..."
								class="pl-10"
								oninput={handleSearchInput}
								onkeydown={(e) => e.key === 'Enter' && performSearch()}
							/>
						</div>
					</div>
					<Button onclick={performSearch}>
						Otsi
					</Button>
				</div>
			</CardContent>
		</Card>

		<!-- Clients Table -->
		<Card>
			<CardHeader>
				<CardTitle class="flex items-center">
					<Users class="h-5 w-5 mr-2" />
					Kõik kliendid
				</CardTitle>
			</CardHeader>
			<CardContent>
				{#if clients.length === 0}
					<div class="text-center py-12">
						<Users class="h-16 w-16 text-gray-400 mx-auto mb-4" />
						<h3 class="text-lg font-medium text-gray-900 mb-2">Kliente ei leitud</h3>
						<p class="text-gray-500">
							{#if searchTerm}
								Otsingule "{searchTerm}" ei vastanud ükski klient.
							{:else}
								Teil pole veel ühtegi registreeritud klienti.
							{/if}
						</p>
					</div>
				{:else}
					<div class="rounded-md border">
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head>Klient</Table.Head>
									<Table.Head>E-post</Table.Head>
									<Table.Head>Telefon</Table.Head>
									<Table.Head>Registreerimisi</Table.Head>
									<Table.Head>Registreeritud</Table.Head>
									<Table.Head class="text-right">Tegevused</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each clients as client}
									<Table.Row class="hover:bg-gray-50">
										<Table.Cell>
											<div class="flex items-center">
												<UserCircle class="h-8 w-8 text-gray-400 mr-3" />
												<div>
													<div class="font-medium text-gray-900">
														{client.first_name} {client.last_name}
													</div>
												</div>
											</div>
										</Table.Cell>
										<Table.Cell>
											<div class="flex items-center text-gray-600">
												<Mail class="h-4 w-4 mr-2 text-gray-400" />
												{client.email}
											</div>
										</Table.Cell>
										<Table.Cell>
											{#if client.phone}
												<div class="flex items-center text-gray-600">
													<Phone class="h-4 w-4 mr-2 text-gray-400" />
													{client.phone}
												</div>
											{:else}
												<span class="text-gray-400">—</span>
											{/if}
										</Table.Cell>
										<Table.Cell>
											<Badge variant="secondary" class="!rounded-sm">
												{client.registrationCount}
											</Badge>
										</Table.Cell>
										<Table.Cell class="text-gray-500">
											{formatDate(client.created)}
										</Table.Cell>
										<Table.Cell class="text-right">
											<Button 
												size="sm" 
												variant="outline"
												onclick={() => viewClient(client)}
											>
												<Eye class="h-4 w-4 mr-1" />
												Vaata
											</Button>
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				{/if}
			</CardContent>
		</Card>
	</main>
</div>

<!-- Client Detail Dialog -->
<Dialog.Root bind:open={showClientDialog}>
	<Dialog.Content class="max-w-2xl">
		<Dialog.Header>
			<Dialog.Title>Kliendi üksikasjad</Dialog.Title>
		</Dialog.Header>

		{#if selectedClient}
			<div class="space-y-6">
				<!-- Personal Info -->
				<div>
					<h3 class="font-semibold mb-3 flex items-center">
						<Users class="h-4 w-4 mr-2" />
						Isikuandmed
					</h3>
					<div class="grid grid-cols-2 gap-4 text-sm">
						<div><strong>Eesnimi:</strong> {selectedClient?.first_name}</div>
						<div><strong>Perekonnanimi:</strong> {selectedClient?.last_name}</div>
						<div><strong>E-post:</strong> {selectedClient?.email}</div>
						<div><strong>Telefon:</strong> {selectedClient?.phone || 'Ei ole määratud'}</div>
						{#if selectedClient?.emergency_phone}
							<div class="col-span-2"><strong>Hädaolukorra kontakt:</strong> {selectedClient.emergency_phone}</div>
						{/if}
						<div><strong>Registreeritud:</strong> {formatDate(selectedClient?.created || '')}</div>
						<div><strong>Registreerimisi kokku:</strong> {selectedClient?.registrationCount}</div>
					</div>
				</div>

				<!-- Quick Actions -->
				<div>
					<h3 class="font-semibold mb-3 flex items-center">
						<Calendar class="h-4 w-4 mr-2" />
						Kiired tegevused
					</h3>
					<div class="flex gap-2">
						<Button 
							variant="outline" 
							size="sm"
							href={`/dashboard/registrations?search=${selectedClient?.email}`}
						>
							Vaata registreerimisi
						</Button>
						<Button 
							variant="outline" 
							size="sm"
							onclick={() => window.open(`mailto:${selectedClient?.email}`, '_blank')}
						>
							<Mail class="h-4 w-4 mr-2" />
							Saada e-kiri
						</Button>
					</div>
				</div>
			</div>

			<Dialog.Footer>
				<Button variant="outline" onclick={() => showClientDialog = false}>
					Sulge
				</Button>
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root> 