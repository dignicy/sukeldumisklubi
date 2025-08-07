<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { Input } from '$lib/components/ui/input';
    import * as Dialog from '$lib/components/ui/dialog';
    import * as Table from '$lib/components/ui/table';
    import * as Select from '$lib/components/ui/select';
    import { Label } from '$lib/components/ui/label';
    import { 
        Users, 
        Calendar, 
        Search, 
        ArrowLeft, 
        Mail, 
        Phone, 
        FileText,
        CheckCircle,
        Clock,
        XCircle,
        Eye,
        ArrowRight,
        CalendarDays,
        MapPin,
        Copy,
        Check,
        ChevronDown,
        ExternalLink
    } from 'lucide-svelte';
    import type { PageData } from './$types';
    import type { EventsResponse, EventRegistrationsResponse } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { enhance } from '$app/forms';

    // Define types for our data structures
    type EventWithStats = EventsResponse & {
        registrationStats: {
            total: number;
            waiting: number;
            paid: number;
        };
    };

    let { data }: { data: PageData } = $props();

    let searchTerm = $state('');
    let statusFilter = $state('');
    let selectedRegistration = $state<any>(null);
    let showRegistrationDialog = $state(false);
    let selectedStatus = $state('');
    let isUpdatingStatus = $state(false);
    let copiedEmails = $state<Set<string>>(new Set());
    let searchTimeout: number;
    let isEditingNotes = $state(false);
    let editedNotes = $state('');

    // Cast the events data to the correct type
    const events = $derived((data.events as EventWithStats[]) || []);
    const registrations = $derived(data.registrations || { items: [], totalItems: 0, totalPages: 0, page: 1 });

    // Status configuration with squared badge styling
    const statusConfig: Record<string, any> = {
        waiting_confirmation: { 
            label: 'Ootab kinnitust', 
            variant: 'secondary',
            class: '!rounded-sm bg-yellow-100 text-yellow-800 border-yellow-200',
            icon: Clock 
        },
        confirmed: { 
            label: 'Kinnitatud', 
            variant: 'secondary',
            class: '!rounded-sm bg-blue-100 text-blue-800 border-blue-200',
            icon: CheckCircle 
        },
        paid: { 
            label: 'Makstud', 
            variant: 'secondary',
            class: '!rounded-sm bg-green-100 text-green-800 border-green-200',
            icon: CheckCircle 
        },
        cancelled: { 
            label: 'Tühistatud', 
            variant: 'secondary',
            class: '!rounded-sm bg-red-100 text-red-800 border-red-200',
            icon: XCircle 
        }
    };

    // Status options for the select dropdown
    const statusOptions = [
        { value: 'waiting_confirmation', label: 'Ootab kinnitust' },
        { value: 'confirmed', label: 'Kinnitatud' },
        { value: 'paid', label: 'Makstud' },
        { value: 'cancelled', label: 'Tühistatud' }
    ];

    // Status filter options (includes "all" option)
    const statusFilterOptions = [
        { value: '', label: 'Kõik staatused' },
        ...statusOptions
    ];

    function formatDate(dateString: string): string {
        if (!dateString) {
            return 'Kuupäev määramata';
        }
        
        const date = new Date(dateString);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Vigane kuupäev';
        }
        
        return date.toLocaleDateString('et-EE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function formatDateTime(dateString: string): string {
        if (!dateString) {
            return 'Kuupäev määramata';
        }
        
        const date = new Date(dateString);
        
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Vigane kuupäev';
        }
        
        return date.toLocaleDateString('et-EE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function performSearch() {
        const url = new URL($page.url);
        if (searchTerm) {
            url.searchParams.set('search', searchTerm);
        } else {
            url.searchParams.delete('search');
        }
        
        if (statusFilter) {
            url.searchParams.set('status', statusFilter);
        } else {
            url.searchParams.delete('status');
        }
        
        url.searchParams.set('page', '1');
        goto(url.toString());
    }

    function handleSearchInput() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300); // 300ms debounce
    }

    function handleStatusFilter() {
        performSearch(); // Immediate search when status changes
    }

    function viewEvent(eventId: string) {
        const url = new URL($page.url);
        url.searchParams.set('event', eventId);
        url.searchParams.delete('search');
        goto(url.toString());
    }

    function backToEvents() {
        const url = new URL($page.url);
        url.searchParams.delete('event');
        url.searchParams.delete('search');
        goto(url.toString());
    }

    function viewRegistration(registration: any) {
        selectedRegistration = registration;
        selectedStatus = registration.status || 'waiting_confirmation';
        editedNotes = registration.notes || '';
        isEditingNotes = false;
        showRegistrationDialog = true;
    }

    function getStatusConfig(status: string) {
        return statusConfig[status] || statusConfig.waiting_confirmation;
    }

    async function copyToClipboard(text: string, key: string) {
        try {
            await navigator.clipboard.writeText(text);
            // Update the set to trigger reactivity
            copiedEmails = new Set(copiedEmails).add(key);
            // Remove the checkmark after 2 seconds
            setTimeout(() => {
                const newSet = new Set(copiedEmails);
                newSet.delete(key);
                copiedEmails = newSet;
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    }

    // Initialize search term and status filter from URL
    $effect(() => {
        searchTerm = $page.url.searchParams.get('search') ?? '';
        statusFilter = $page.url.searchParams.get('status') ?? '';
    });
</script>

<svelte:head>
    <title>Registreerimiste haldamine - Administraatori Töölaud</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    {#if data.mode === 'event_details'}
                        <Button onclick={backToEvents} variant="ghost" size="sm" class="mr-4">
                            <ArrowLeft class="h-4 w-4 mr-2" />
                            Tagasi üritustele
                        </Button>
                        <h1 class="text-2xl font-bold text-gray-900">
                            {(data.selectedEvent as any)?.title || 'Ürituse registreerimised'}
                        </h1>
                    {:else}
                        <Button href="/dashboard" variant="ghost" size="sm" class="mr-4">
                            <ArrowLeft class="h-4 w-4 mr-2" />
                            Tagasi
                        </Button>
                        <h1 class="text-2xl font-bold text-gray-900">Registreerimiste haldamine</h1>
                    {/if}
                </div>
                <Badge variant="secondary" class="!rounded-sm">
                    {#if data.mode === 'event_details'}
                        {data.registrations?.totalItems || 0} registreerimist
                    {:else}
                        {data.stats.totalRegistrations} registreerimist kokku
                    {/if}
                </Badge>
            </div>
        </div>
    </header>

    	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {#if data.mode === 'events_overview'}
            <!-- Stats Overview -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Ootab kinnitust</CardTitle>
                        <Clock class="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-yellow-600">{data.stats.waitingConfirmation}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Makstud</CardTitle>
                        <CheckCircle class="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold text-green-600">{data.stats.paid}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Kokku registreerimisi</CardTitle>
                        <Users class="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{data.stats.totalRegistrations}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle class="text-sm font-medium">Kliente kokku</CardTitle>
                        <Users class="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div class="text-2xl font-bold">{data.stats.totalClients}</div>
                    </CardContent>
                </Card>
            </div>

            <!-- Search -->
            <Card class="mb-6">
                <CardContent class="p-6">
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <div class="relative">
                                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                								                                <Input
                                    bind:value={searchTerm}
                                    placeholder="Otsi ürituse nime järgi..."
                                    class="pl-10"
                                    oninput={handleSearchInput}
                                />
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="relative">
                                <select 
                                    bind:value={statusFilter}
                                    onchange={handleStatusFilter}
                                    class="appearance-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                                >
                                    {#each statusFilterOptions as option}
                                        <option value={option.value}>{option.label}</option>
                                    {/each}
                                </select>
                                <ChevronDown class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Events List -->
            <Card>
                <CardHeader>
                    <CardTitle>Üritused ja registreerimised</CardTitle>
                </CardHeader>
                <CardContent>
                    {#if !data.events || data.events.length === 0}
                        <div class="text-center py-8">
                            <Calendar class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Üritusi ei leitud</h3>
                            							<p class="text-gray-500">
								{#if searchTerm}
									Otsingule "{searchTerm}" ei vastanud ükski üritus.
								{:else}
									Teil pole veel ühtegi üritust.
								{/if}
							</p>
                        </div>
                    {:else}
                        <div class="space-y-4">
                            {#each events as event}
                                <div class="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                                    <div class="flex items-center justify-between">
                                        <div class="flex-1">
                                            <h3 class="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                                            <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                                {#if event.startDate}
                                                    <div class="flex items-center">
                                                        <CalendarDays class="h-4 w-4 mr-1" />
                                                        {formatDate(event.startDate)}
                                                    </div>
                                                {/if}
                                                {#if event.location}
                                                    <div class="flex items-center">
                                                        <MapPin class="h-4 w-4 mr-1" />
                                                        {event.location}
                                                    </div>
                                                {/if}
                                            </div>
                                            <div class="flex items-center gap-4">
                                                <Badge variant="outline" class="!rounded-sm bg-blue-50">
                                                    Kokku: {event.registrationStats.total}
                                                </Badge>
                                                {#if event.registrationStats.waiting > 0}
                                                    <Badge variant="outline" class="!rounded-sm bg-yellow-50 text-yellow-700">
                                                        Ootab: {event.registrationStats.waiting}
                                                    </Badge>
                                                {/if}
                                                {#if event.registrationStats.paid > 0}
                                                    <Badge variant="outline" class="!rounded-sm bg-green-50 text-green-700">
                                                        Makstud: {event.registrationStats.paid}
                                                    </Badge>
                                                {/if}
                                            </div>
                                        </div>
                                        										<div class="flex items-center gap-2">
											{#if event.registrationStats.total > 0}
												<Button 
													variant="outline" 
													size="sm"
													onclick={() => viewEvent(event.id)}
												>
													<Eye class="h-4 w-4 mr-2" />
													Vaata registreerimisi
													<ArrowRight class="h-4 w-4 ml-2" />
												</Button>
											{:else}
												                                                <Badge variant="secondary" class="!rounded-sm">Registreerimisi pole</Badge>
											{/if}
										</div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                </CardContent>
            </Card>

        {:else if data.mode === 'event_details'}
            <!-- Event Details Header -->
            {#if data.selectedEvent}
                <Card class="mb-6">
                    <CardContent class="p-6">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <h2 class="text-xl font-semibold text-gray-900 mb-2">{(data.selectedEvent as any).title}</h2>
                                <div class="space-y-2 text-sm text-gray-600">
                                    <div class="flex items-center">
                                        <MapPin class="h-4 w-4 mr-2" />
                                        <span>{(data.selectedEvent as any).location}</span>
                                    </div>
                                    <div class="space-y-1">
                                        <div class="flex items-center">
                                            <CalendarDays class="h-4 w-4 mr-2 text-green-600" />
                                            <span><strong>Algus:</strong> {formatDate(data.selectedEvent.startDate)}{#if data.selectedEvent.startTime}, kell {data.selectedEvent.startTime}{/if}</span>
                                        </div>
                                        {#if data.selectedEvent.endDate || data.selectedEvent.endTime}
                                            <div class="flex items-center">
                                                <CalendarDays class="h-4 w-4 mr-2 text-red-600" />
                                                <span><strong>Lõpp:</strong> 
                                                {#if data.selectedEvent.endDate}
                                                    {formatDate(data.selectedEvent.endDate)}
                                                {:else}
                                                    {formatDate(data.selectedEvent.startDate)}
                                                {/if}
                                                {#if data.selectedEvent.endTime}, kell {data.selectedEvent.endTime}{/if}</span>
                                            </div>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-3 ml-6">
                                <Badge variant="secondary" class="!rounded-sm">
                                    {data.registrations?.totalItems || 0} registreerimist
                                </Badge>
                                {#if (data.selectedEvent as any)?.pageSlug}
                                    <div class="flex items-center gap-1">
                                        <Input 
                                            disabled 
                                            value="https://sukeldumisklubi.ee/uritused/{(data.selectedEvent as any).pageSlug}"
                                            class="min-w-[500px] text-xs"
                                            readonly
                                        />
                                        <Button
                                            onclick={() => window.open(`/uritused/${(data.selectedEvent as any).pageSlug}`, '_blank')}
                                            variant="ghost"
                                            size="sm"
                                            title="Ava uues vahelehes"
                                        >
                                            <ExternalLink class="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onclick={() => copyToClipboard(`https://sukeldumisklubi.ee/uritused/${(data.selectedEvent as any).pageSlug}`, 'event-url')}
                                            variant="ghost"
                                            size="sm"
                                            title="Kopeeri link"
                                        >
                                            {#if copiedEmails.has('event-url')}
                                                <Check class="h-4 w-4 text-green-600" />
                                            {:else}
                                                <Copy class="h-4 w-4" />
                                            {/if}
                                        </Button>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            {/if}

            <!-- Search for registrations -->
            <Card class="mb-6">
                <CardContent class="p-6">
                    <div class="flex gap-4">
                        <div class="flex-1">
                            <div class="relative">
                                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    bind:value={searchTerm}
                                    placeholder="Otsi registreerinu nime või e-posti järgi..."
                                    class="pl-10"
                                    oninput={handleSearchInput}
                                />
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="relative">
                                <select 
                                    bind:value={statusFilter}
                                    onchange={handleStatusFilter}
                                    class="appearance-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                                >
                                    {#each statusFilterOptions as option}
                                        <option value={option.value}>{option.label}</option>
                                    {/each}
                                </select>
                                <ChevronDown class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <!-- Registrations Table -->
            <Card>
                <CardHeader>
                    <CardTitle>Registreerimised</CardTitle>
                </CardHeader>
                <CardContent>
                    {#if data.registrations && data.registrations.items.length === 0}
                        <div class="text-center py-8">
                            <Users class="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Registreerimisi ei leitud</h3>
                            <p class="text-gray-500">
                                {#if searchTerm}
                                    Otsingule "{searchTerm}" ei vastanud ükski registreerimine.
                                {:else}
                                    Sellele üritusele pole veel keegi registreerunud.
                                {/if}
                            </p>
                        </div>
                    {:else}
                        <div class="rounded-md border">
                            <Table.Root>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.Head>Registreerinu</Table.Head>
                                        <Table.Head>E-post</Table.Head>
                                        <Table.Head>Telefon</Table.Head>
                                        <Table.Head>Staatus</Table.Head>
                                        <Table.Head>Registreeritud</Table.Head>
                                        <Table.Head class="text-right">Tegevused</Table.Head>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {#each data.registrations?.items || [] as registration}
                                        <Table.Row>
                                            <Table.Cell class="font-medium">
                                                {registration.expand?.client?.first_name} {registration.expand?.client?.last_name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div class="flex items-center gap-2">
                                                    <span class="text-sm text-muted-foreground">
                                                        {registration.expand?.client?.email}
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        class="h-6 w-6 p-0"
                                                        onclick={() => copyToClipboard(registration.expand?.client?.email, `email-${registration.id}`)}
                                                        title="Kopeeri e-post"
                                                    >
                                                        {#if copiedEmails.has(`email-${registration.id}`)}
                                                            <Check class="h-3 w-3 text-green-600" />
                                                        {:else}
                                                            <Copy class="h-3 w-3" />
                                                        {/if}
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell class="text-muted-foreground">
                                                {registration.expand?.client?.phone || '-'}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Badge variant={getStatusConfig(registration.status).variant} class={getStatusConfig(registration.status).class}>
                                                    {@const IconComponent = getStatusConfig(registration.status).icon}
                                                    <IconComponent class="h-3 w-3 mr-1" />
                                                    {getStatusConfig(registration.status).label}
                                                </Badge>
                                            </Table.Cell>
                                            <Table.Cell class="text-muted-foreground">
                                                {formatDateTime(registration.created)}
                                            </Table.Cell>
                                            <Table.Cell class="text-right">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onclick={() => viewRegistration(registration)}
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

                        <!-- Pagination -->
                        {#if data.registrations && data.registrations.totalPages > 1}
                            <div class="flex justify-center mt-6">
                                <div class="text-sm text-gray-500">
                                    Lehekülg {data.registrations.page} / {data.registrations.totalPages} 
                                    ({data.registrations.totalItems} tulemust)
                                </div>
                            </div>
                        {/if}
                    {/if}
                </CardContent>
            </Card>
        {/if}
    </main>
</div>

<!-- Registration Detail Dialog -->
<Dialog.Root bind:open={showRegistrationDialog}>
    <Dialog.Content class="max-w-lg">
        <Dialog.Header>
            <Dialog.Title>Registreeringu üksikasjad</Dialog.Title>
        </Dialog.Header>

        {#if selectedRegistration}
            <div class="space-y-6">
                <!-- Client Info -->
                <div>
                    <h3 class="font-semibold mb-3 flex items-center">
                        <Users class="h-4 w-4 mr-2 text-blue-600" />
                        Kliendi andmed
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div>
                            <strong>Nimi:</strong> {selectedRegistration.expand?.client?.first_name} {selectedRegistration.expand?.client?.last_name}
                        </div>
                        
                        <div>
                            <strong>E-post:</strong> {selectedRegistration.expand?.client?.email}
                            <Button
                                size="sm"
                                variant="ghost"
                                class="h-6 w-6 p-0 ml-2"
                                onclick={() => copyToClipboard(selectedRegistration.expand?.client?.email, 'email')}
                                title="Kopeeri e-post"
                            >
                                {#if copiedEmails.has('email')}
                                    <Check class="h-3 w-3 text-green-600" />
                                {:else}
                                    <Copy class="h-3 w-3" />
                                {/if}
                            </Button>
                        </div>
                        
                        <div>
                            <strong>Telefon:</strong> {selectedRegistration.expand?.client?.phone || 'Ei ole määratud'}
                            {#if selectedRegistration.expand?.client?.phone}
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    class="h-6 w-6 p-0 ml-2"
                                    onclick={() => copyToClipboard(selectedRegistration.expand?.client?.phone, 'phone')}
                                    title="Kopeeri telefon"
                                >
                                    {#if copiedEmails.has('phone')}
                                        <Check class="h-3 w-3 text-green-600" />
                                    {:else}
                                        <Copy class="h-3 w-3" />
                                    {/if}
                                </Button>
                            {/if}
                        </div>
                        
                        {#if selectedRegistration.expand?.client?.emergency_phone}
                            <div>
                                <strong>Hädaolukorra kontakt:</strong> {selectedRegistration.expand?.client?.emergency_phone}
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    class="h-6 w-6 p-0 ml-2"
                                    onclick={() => copyToClipboard(selectedRegistration.expand?.client?.emergency_phone, 'emergency')}
                                    title="Kopeeri hädaolukorra kontakt"
                                >
                                    {#if copiedEmails.has('emergency')}
                                        <Check class="h-3 w-3 text-green-600" />
                                    {:else}
                                        <Copy class="h-3 w-3" />
                                    {/if}
                                </Button>
                            </div>
                        {/if}
                    </div>
                </div>

                <!-- Registration Info -->
                <div>
                    <h3 class="font-semibold mb-3 flex items-center">
                        <Calendar class="h-4 w-4 mr-2 text-purple-600" />
                        Registreeringu andmed
                    </h3>
                    <div class="space-y-3 text-sm">
                        <div><strong>Üritus:</strong> {selectedRegistration.expand?.event?.title}</div>
                        <div><strong>Registreeritud:</strong> {formatDateTime(selectedRegistration.created)}</div>
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <strong>Märkused:</strong>
                                {#if !isEditingNotes}
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        class="h-6 px-2 text-xs"
                                        onclick={() => {
                                            isEditingNotes = true;
                                            editedNotes = selectedRegistration.notes || '';
                                        }}
                                    >
                                        <FileText class="h-3 w-3 mr-1" />
                                        Muuda
                                    </Button>
                                {/if}
                            </div>
                            
                            {#if isEditingNotes}
                                <form method="POST" action="?/updateNotes" use:enhance={() => {
                                    return async ({ result, update }) => {
                                        if (result.type === 'success') {
                                            if (selectedRegistration) {
                                                selectedRegistration.notes = editedNotes;
                                            }
                                            isEditingNotes = false;
                                            await update();
                                        }
                                    };
                                }}>
                                    <input type="hidden" name="registrationId" value={selectedRegistration.id} />
                                    <div class="space-y-2">
                                        <textarea
                                            name="notes"
                                            bind:value={editedNotes}
                                            placeholder="Lisa märkused..."
                                            rows="3"
                                            class="w-full p-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        ></textarea>
                                        <div class="flex items-center gap-2">
                                            <Button type="submit" size="sm" class="px-3 py-1 text-xs">
                                                <CheckCircle class="h-3 w-3 mr-1" />
                                                Salvesta
                                            </Button>
                                            <Button 
                                                type="button" 
                                                size="sm" 
                                                variant="ghost" 
                                                class="px-3 py-1 text-xs"
                                                onclick={() => {
                                                    isEditingNotes = false;
                                                    editedNotes = selectedRegistration.notes || '';
                                                }}
                                            >
                                                Tühista
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            {:else}
                                <div class="mt-1 p-3 bg-muted/30 rounded-md text-muted-foreground whitespace-pre-wrap min-h-[60px] text-sm">
                                    {selectedRegistration.notes || 'Märkused puuduvad...'}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- Status Management -->
                <div>
                    <h3 class="font-semibold mb-4 flex items-center text-sm">
                        <FileText class="h-4 w-4 mr-2 text-indigo-600" />
                        Staatus
                    </h3>
                    
                    <form method="POST" action="?/updateStatus" use:enhance={() => {
                        isUpdatingStatus = true;
                        return async ({ result, update }) => {
                            isUpdatingStatus = false;
                            if (result.type === 'success') {
                                if (selectedRegistration) {
                                    selectedRegistration.status = selectedStatus;
                                }
                                await update();
                            } else if (result.type === 'failure') {
                                console.error('Status update failed:', result.data);
                            }
                        };
                    }}>
                        <input type="hidden" name="registrationId" value={selectedRegistration.id} />
                        <input type="hidden" name="status" value={selectedStatus} />
                        
                        <div class="inline-flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
                            <!-- Status Select -->
                            <Select.Root type="single" bind:value={selectedStatus}>
                                <Select.Trigger class="h-auto p-0 border-none bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0 transition-colors">
                                    <div class="{getStatusConfig(selectedStatus || '').class} cursor-pointer transition-all hover:scale-105 text-xs px-2 py-1 rounded-sm flex items-center gap-1 whitespace-nowrap">
                                        {#if getStatusConfig(selectedStatus || '').icon === Clock}
                                            <Clock class="h-3 w-3 flex-shrink-0" />
                                        {:else if getStatusConfig(selectedStatus || '').icon === CheckCircle}
                                            <CheckCircle class="h-3 w-3 flex-shrink-0" />
                                        {:else if getStatusConfig(selectedStatus || '').icon === XCircle}
                                            <XCircle class="h-3 w-3 flex-shrink-0" />
                                        {/if}
                                        <span class="flex-shrink-0">{getStatusConfig(selectedStatus || '').label}</span>
                                    </div>
                                </Select.Trigger>
                                <Select.Content class="min-w-[160px] p-1 [&_[data-selected]]:hidden [&_.lucide-check]:hidden">
                                    {#each statusOptions as option}
                                        <Select.Item value={option.value} label={option.label} class="cursor-pointer p-2 rounded-md focus:bg-gray-100 hover:bg-gray-50 transition-colors data-[highlighted]:bg-gray-100 data-[selected]:bg-transparent">
                                            <div class="{getStatusConfig(option.value).class} pointer-events-none text-xs px-2 py-1 rounded-sm flex items-center gap-1 whitespace-nowrap w-fit">
                                                {#if getStatusConfig(option.value).icon === Clock}
                                                    <Clock class="h-3 w-3 flex-shrink-0" />
                                                {:else if getStatusConfig(option.value).icon === CheckCircle}
                                                    <CheckCircle class="h-3 w-3 flex-shrink-0" />
                                                {:else if getStatusConfig(option.value).icon === XCircle}
                                                    <XCircle class="h-3 w-3 flex-shrink-0" />
                                                {/if}
                                                <span class="flex-shrink-0">{option.label}</span>
                                            </div>
                                        </Select.Item>
                                    {/each}
                                </Select.Content>
                            </Select.Root>
                            
                            <!-- Separator -->
                            <div class="w-px h-4 bg-gray-300"></div>
                            
                            <!-- Update Button -->
                            <Button 
                                type="submit" 
                                size="sm"
                                variant={selectedStatus !== selectedRegistration?.status ? "default" : "ghost"}
                                disabled={isUpdatingStatus || selectedStatus === selectedRegistration?.status}
                                class="px-3 py-1 text-xs transition-all flex-shrink-0"
                            >
                                {#if isUpdatingStatus}
                                    <div class="flex items-center">
                                        <div class="h-3 w-3 mr-1 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                                        Uuendan
                                    </div>
                                {:else if selectedStatus !== selectedRegistration?.status}
                                    <div class="flex items-center">
                                        <CheckCircle class="h-3 w-3 mr-1" />
                                        Salvesta
                                    </div>
                                {:else}
                                    <div class="flex items-center text-gray-500">
                                        <Check class="h-3 w-3 mr-1" />
                                        Salvestatud
                                    </div>
                                {/if}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <Dialog.Footer>
                <Button variant="outline" onclick={() => showRegistrationDialog = false}>
                    Sulge
                </Button>
            </Dialog.Footer>
        {/if}
    </Dialog.Content>
</Dialog.Root> 