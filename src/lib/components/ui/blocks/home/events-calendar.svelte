<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import {
		Calendar as CalendarIcon,
		MapPin,
		Users,
		Clock,
		Grid3X3,
		List,
		Search,
		X,
		ChevronDown,
		ArrowRight
	} from 'lucide-svelte';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import type { DateValue } from '@internationalized/date';
	import type { DiveEvent, ViewMode, EventType } from '$lib/types/events';
	import { EVENT_TYPE_COLORS } from '$lib/types/events';

	interface Props {
		events: DiveEvent[];
	}

	let { events }: Props = $props();

	// Use $state for all reactive variables - FIXED: Use primitive values
	let currentView = $state<ViewMode>('grid');
	let searchTerm = $state('');
	let selectedEventType = $state('all');
	let selectedLocation = $state('all');
	let startDate = $state<DateValue | undefined>(undefined);
	let endDate = $state<DateValue | undefined>(undefined);

	// Popover open states
	let startDateOpen = $state(false);
	let endDateOpen = $state(false);

	// Estonian month abbreviations
	const estonianMonths = [
		'JAN',
		'VEB',
		'MÄR',
		'APR',
		'MAI',
		'JUN',
		'JUL',
		'AUG',
		'SEPT',
		'OKT',
		'NOV',
		'DETS'
	];

	// Get unique locations for filter options - handle empty events array
	const uniqueLocations =
		events.length > 0 ? [...new Set(events.map((event) => event.location))] : [];

	// Helper function to format date for display
	function formatDateForDisplay(date: DateValue | undefined): string {
		if (!date) return 'Vali kuupäev';
		return date.toDate(getLocalTimeZone()).toLocaleDateString('et-EE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	// Helper function to convert DateValue to Date for comparison
	function dateValueToDate(dateValue: DateValue): Date {
		const date = dateValue.toDate(getLocalTimeZone());
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	// Filter events based on current filter settings - FIXED: Use primitive values
	function filterEvents(events: DiveEvent[]): DiveEvent[] {
		return events.filter((event) => {
			// Search query filter
			if (searchTerm.trim()) {
				const searchLower = searchTerm.toLowerCase();
				const matchesSearch =
					event.title.toLowerCase().includes(searchLower) ||
					event.description.toLowerCase().includes(searchLower) ||
					event.excerpt.toLowerCase().includes(searchLower) ||
					event.location.toLowerCase().includes(searchLower);
				if (!matchesSearch) return false;
			}

			// Event type filter
			if (selectedEventType !== 'all' && event.type !== selectedEventType) {
				return false;
			}

			// Location filter
			if (selectedLocation !== 'all' && event.location !== selectedLocation) {
				return false;
			}

			// Date range filter
			const eventDate = new Date(event.startDate);
			const eventDateOnly = new Date(
				eventDate.getFullYear(),
				eventDate.getMonth(),
				eventDate.getDate()
			);

			if (startDate) {
				const fromDate = dateValueToDate(startDate);
				if (eventDateOnly < fromDate) return false;
			}

			if (endDate) {
				const toDate = dateValueToDate(endDate);
				if (eventDateOnly > toDate) return false;
			}

			return true;
		});
	}

	// Sort events by proximity to current date (closest first)
	function sortEventsByDate(events: DiveEvent[]): DiveEvent[] {
		const now = new Date();
		return events.sort((a, b) => {
			const dateA = new Date(a.startDate);
			const dateB = new Date(b.startDate);
			const diffA = Math.abs(dateA.getTime() - now.getTime());
			const diffB = Math.abs(dateB.getTime() - now.getTime());
			return diffA - diffB;
		});
	}

	// Clear all filters - FIXED: Reset to primitive values
	function clearFilters() {
		searchTerm = '';
		selectedEventType = 'all';
		selectedLocation = 'all';
		startDate = undefined;
		endDate = undefined;
	}

	// Check if any filters are active - FIXED: Use primitive values
	function hasActiveFilters(): boolean {
		return (
			searchTerm.trim() !== '' ||
			selectedEventType !== 'all' ||
			selectedLocation !== 'all' ||
			startDate !== undefined ||
			endDate !== undefined
		);
	}

	// Using $derived for computed values in Svelte 5
	let filteredEvents = $derived(filterEvents(events));
	let sortedEvents = $derived(sortEventsByDate([...filteredEvents]));

	function formatDate(dateString: string): string {
		if (!dateString) return '';

		// Handle PocketBase date format (ISO string) or regular date string
		const date = new Date(dateString);

		// Check if date is valid
		if (isNaN(date.getTime())) {
			console.warn('Invalid date string:', dateString);
			return dateString; // Return original string if can't parse
		}

		return date.toLocaleDateString('et-EE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	}

	function formatDateRange(startDate: string, endDate?: string): string {
		if (!endDate) return formatDate(startDate);

		const start = new Date(startDate);
		const end = new Date(endDate);

		// Check if dates are valid
		if (isNaN(start.getTime()) || isNaN(end.getTime())) {
			console.warn('Invalid date in range:', { startDate, endDate });
			return `${formatDate(startDate)} - ${formatDate(endDate)}`;
		}

		if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
			return `${start.getDate()}.${String(start.getMonth() + 1).padStart(2, '0')} - ${end.getDate()}.${String(end.getMonth() + 1).padStart(2, '0')}`;
		}

		return `${formatDate(startDate)} - ${formatDate(endDate)}`;
	}

	function formatTime(time?: string): string {
		if (!time) return '';

		// If it's already in HH:MM format (formatted on server), return as is
		if (time.match(/^\d{2}:\d{2}$/)) {
			return time;
		}

		// If time includes date (ISO string), extract just the time part
		if (time.includes('T')) {
			const date = new Date(time);
			if (!isNaN(date.getTime())) {
				return date.toLocaleTimeString('et-EE', {
					hour: '2-digit',
					minute: '2-digit',
					timeZone: 'Europe/Tallinn'
				});
			}
		}

		return time;
	}

	function formatEstonianMonth(dateString: string): string {
		const date = new Date(dateString);
		return estonianMonths[date.getMonth()];
	}

	function getEventTypeStyle(type: DiveEvent['type']) {
		return EVENT_TYPE_COLORS[type];
	}

	function getDaysUntilEvent(dateString: string): number {
		if (!dateString) return -1;

		const eventDate = new Date(dateString);
		if (isNaN(eventDate.getTime())) {
			console.warn('Invalid event date:', dateString);
			return -1;
		}

		const today = new Date();
		// Set time to start of day for accurate day calculation
		today.setHours(0, 0, 0, 0);
		eventDate.setHours(0, 0, 0, 0);

		const diffTime = eventDate.getTime() - today.getTime();
		return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	}

	function getCalendarEvents() {
		const eventsByMonth = sortedEvents.reduce(
			(acc, event) => {
				const month = new Date(event.startDate).toLocaleDateString('et-EE', {
					year: 'numeric',
					month: 'long'
				});
				if (!acc[month]) acc[month] = [];
				acc[month].push(event);
				return acc;
			},
			{} as Record<string, DiveEvent[]>
		);

		return eventsByMonth;
	}

	let calendarEvents = $derived(getCalendarEvents());

	// Helper functions to get display labels
	function getEventTypeLabel(value: string): string {
		switch (value) {
			case 'all':
				return 'Kõik tüübid';
			case 'Üritus':
				return 'Üritus';
			case 'Koolitus':
				return 'Koolitus';
			case 'Reis':
				return 'Reis';
			default:
				return 'Kõik tüübid';
		}
	}

	function getLocationLabel(value: string): string {
		if (value === 'all') return 'Kõik asukohad';
		return value;
	}
</script>

<!-- Events Calendar Section -->
<section class="bg-white py-8">
	<div class="container mx-auto px-6 mb-16">
		<!-- Filter and View Controls Bar -->
		<div class="mx-auto mb-8 max-w-7xl">
			<div class="rounded-xl border bg-white p-6 shadow-md">
				<div class="flex flex-col items-center gap-4 xl:flex-row">
					<!-- Search -->
					<div class="relative min-w-[250px] flex-1">
						<Search
							class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400"
						/>
						<Input bind:value={searchTerm} placeholder="Otsi üritusi..." class="pl-10" />
					</div>

					<!-- Event Type Filter - FIXED: Use proper bits-ui Select API -->
					<div class="min-w-[140px]">
						<Select.Root type="single" bind:value={selectedEventType}>
							<Select.Trigger class="w-full">
								{getEventTypeLabel(selectedEventType)}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="all">Kõik tüübid</Select.Item>
								<Select.Item value="Üritus">Üritus</Select.Item>
								<Select.Item value="Koolitus">Koolitus</Select.Item>
								<Select.Item value="Reis">Reis</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>

					<!-- Location Filter - FIXED: Use proper bits-ui Select API -->
					<div class="min-w-[160px]">
						<Select.Root type="single" bind:value={selectedLocation}>
							<Select.Trigger class="w-full">
								{getLocationLabel(selectedLocation)}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="all">Kõik asukohad</Select.Item>
								{#each uniqueLocations as location}
									<Select.Item value={location}>{location}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<!-- Date Range - FIXED: Add type="single" and auto-close -->
					<div class="flex items-center gap-2">
						<Popover.Root bind:open={startDateOpen}>
							<Popover.Trigger>
								<Button variant="outline" class="min-w-[120px] justify-start">
									<CalendarIcon class="mr-2 h-4 w-4" />
									{startDate ? formatDateForDisplay(startDate) : 'Algus'}
								</Button>
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0">
								<Calendar
									type="single"
									bind:value={startDate}
									onValueChange={() => {
										startDateOpen = false;
									}}
								/>
							</Popover.Content>
						</Popover.Root>

						<span class="text-gray-400">–</span>

						<Popover.Root bind:open={endDateOpen}>
							<Popover.Trigger>
								<Button variant="outline" class="min-w-[120px] justify-start">
									<CalendarIcon class="mr-2 h-4 w-4" />
									{endDate ? formatDateForDisplay(endDate) : 'Lõpp'}
								</Button>
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0">
								<Calendar
									type="single"
									bind:value={endDate}
									onValueChange={() => {
										endDateOpen = false;
									}}
								/>
							</Popover.Content>
						</Popover.Root>
					</div>

					<!-- Clear Filters -->
					{#if hasActiveFilters()}
						<Button
							variant="ghost"
							onclick={clearFilters}
							size="sm"
							class="flex shrink-0 items-center gap-2"
						>
							<X class="h-4 w-4" />
							Tühista
						</Button>
					{/if}

					<!-- View Toggle -->
					<div class="flex shrink-0 rounded-lg bg-gray-100 p-1">
						<button
							class="rounded-md p-2 transition-all {currentView === 'grid'
								? 'bg-white text-orange-600 shadow-sm'
								: 'text-gray-600 hover:bg-gray-200'}"
							onclick={() => (currentView = 'grid')}
							title="Ruudustik vaade"
						>
							<Grid3X3 class="h-4 w-4" />
						</button>
						<button
							class="rounded-md p-2 transition-all {currentView === 'calendar'
								? 'bg-white text-orange-600 shadow-sm'
								: 'text-gray-600 hover:bg-gray-200'}"
							onclick={() => (currentView = 'calendar')}
							title="Kalender vaade"
						>
							<List class="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			<!-- Debug Info - FIXED: Show proper primitive values
			<div class="mt-4 rounded bg-gray-100 p-4 text-sm">
				<strong>Debug:</strong>
				Search: "{searchTerm}" | Type: {selectedEventType} | Location: {selectedLocation} | From: {startDate
					? formatDateForDisplay(startDate)
					: 'None'} | To: {endDate ? formatDateForDisplay(endDate) : 'None'} | Filtered: {filteredEvents.length}/{events.length}
				{#if events.length > 0}
					<br /><strong>First Event Data:</strong>
					startDate: "{events[0].startDate}" | startTime: "{events[0].startTime}" | location: "{events[0]
						.location}" | title: "{events[0].title}"
				{/if}
			</div> -->

			<!-- Results Summary -->
			<div class="mt-4 text-left text-xs text-gray-600">
				{#if hasActiveFilters()}
					Leitud {sortedEvents.length} üritust {events.length}-st
				{:else}
					Kokku leitud {events.length} üritust
				{/if}
			</div>
		</div>

		<!-- No Results Message -->
		{#if sortedEvents.length === 0}
			<div class="py-12 text-center">
				<div class="mx-auto max-w-md">
					<CalendarIcon class="mx-auto mb-4 h-16 w-16 text-gray-300" />
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Ühtegi üritust ei leitud</h3>
					<p class="mb-6 text-gray-600">
						Proovige muuta otsingukriteeriumeid või tühistage filtrid.
					</p>
					{#if hasActiveFilters()}
						<Button onclick={clearFilters}>Tühista filtrid</Button>
					{/if}
				</div>
			</div>
		{:else}
			<!-- Grid View -->
			{#if currentView === 'grid'}
				<div class="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each sortedEvents as event}
						<Card
							class="group overflow-hidden rounded-2xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl"
						>
							<div class="relative h-48 overflow-hidden">
								<img
									src={event.image}
									alt={event.title}
									class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									onerror={(e) => {
										(e.currentTarget as HTMLImageElement).src =
											'/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
									}}
								/>
								<div class="absolute left-4 top-4">
									<span
										class="rounded-full px-3 py-1 text-sm font-medium {getEventTypeStyle(event.type)
											.bg} {getEventTypeStyle(event.type).text}"
									>
										{event.type}
									</span>
								</div>
								{#if event.price}
									<div
										class="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm"
									>
										<span class="text-sm font-semibold text-gray-900">€{event.price}</span>
									</div>
								{/if}
								{#if getDaysUntilEvent(event.startDate) >= 0 && getDaysUntilEvent(event.startDate) <= 7}
									<div
										class="absolute bottom-4 left-4 rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-white"
									>
										{getDaysUntilEvent(event.startDate) === 0
											? 'Täna'
											: getDaysUntilEvent(event.startDate) === 1
												? 'Homme'
												: `${getDaysUntilEvent(event.startDate)} päeva pärast`}
									</div>
								{/if}
							</div>

							<CardContent class="p-6">
								<h3 class="mb-3 text-xl font-semibold text-gray-900">
									{event.title}
								</h3>

								<p class="mb-4 line-clamp-2 leading-relaxed text-gray-600">
									{event.excerpt}
								</p>

								<div class="mb-6 space-y-2">
									<div class="flex items-center text-sm text-gray-500">
										<CalendarIcon class="mr-2 h-4 w-4" />
										{formatDate(event.startDate)}
									</div>

									{#if event.startTime}
										<div class="flex items-center text-sm text-gray-500">
											<Clock class="mr-2 h-4 w-4" />
											{formatTime(event.startTime)}
										</div>
									{/if}

									<div class="flex items-center text-sm text-gray-500">
										<MapPin class="mr-2 h-4 w-4" />
										{event.location}
									</div>

									{#if event.maxParticipants}
										<div class="flex items-center text-sm text-gray-500">
											<Users class="mr-2 h-4 w-4" />
											{event.maxParticipants} kohta kokku
										</div>
									{/if}
								</div>

								<Button
									variant="outline"
									class="group relative w-full rounded-xl border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
									onclick={() => (window.location.href = `/uritused/${event.pageSlug || event.id}`)}
								>
									Vaata täpsemalt
									<ArrowRight class="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" />
								</Button>
							</CardContent>
						</Card>
					{/each}
				</div>
			{/if}

			<!-- Calendar View -->
			{#if currentView === 'calendar'}
				<div class="mx-auto max-w-7xl">
					{#each Object.entries(calendarEvents) as [month, monthEvents]}
						<div class="mb-12">
							<h3 class="mb-6 text-2xl font-semibold capitalize text-gray-900">{month}</h3>
							<div class="grid gap-6">
								{#each monthEvents as event}
									<Card
										class="overflow-hidden rounded-xl border border-gray-200 transition-shadow duration-200 hover:shadow-lg"
									>
										<CardContent class="p-0">
											<div class="flex min-h-[180px]">
												<!-- Event Image with Date & Time Overlay - Taking up ~25% of width -->
												<div class="relative w-1/4 overflow-hidden rounded-l-xl">
													<img
														src={event.image}
														alt={event.title}
														class="absolute inset-0 h-full w-full object-cover object-center"
														onerror={(e) => {
															(e.currentTarget as HTMLImageElement).src =
																'/photos/sukeldumisklubi-photo-credit-manomi-tennakoon-2016.webp';
														}}
													/>
													<!-- Combined Date & Time overlay -->
													<div
														class="absolute left-3 top-3 z-10 rounded-lg border border-white/20 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm"
													>
														<div class="text-center">
															<div class="text-xl font-bold leading-none text-gray-900">
																{new Date(event.startDate).getDate()}
															</div>
															<div
																class="mt-0.5 text-xs font-semibold uppercase leading-none tracking-wide text-gray-600"
															>
																{formatEstonianMonth(event.startDate)}
															</div>
															{#if event.startTime}
																<div
																	class="mt-1 border-t border-gray-200 pt-1 text-xs font-medium text-gray-700"
																>
																	{formatTime(event.startTime)}
																</div>
															{/if}
														</div>
													</div>
												</div>

												<!-- Event Content - Taking up ~75% of width -->
												<div class="flex flex-1 flex-col justify-between p-6">
													<div>
														<div class="mb-4 flex items-center gap-3">
															<span
																class="rounded-full px-3 py-1 text-sm font-medium {getEventTypeStyle(
																	event.type
																).bg} {getEventTypeStyle(event.type).text}"
															>
																{event.type}
															</span>
															{#if getDaysUntilEvent(event.startDate) >= 0 && getDaysUntilEvent(event.startDate) <= 7}
																<span
																	class="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
																>
																	{getDaysUntilEvent(event.startDate) === 0
																		? 'Täna'
																		: getDaysUntilEvent(event.startDate) === 1
																			? 'Homme'
																			: `${getDaysUntilEvent(event.startDate)} päeva pärast`}
																</span>
															{/if}
														</div>

														<h4 class="mb-3 text-xl font-semibold text-gray-900">
															{event.title}
														</h4>

														<p class="mb-4 line-clamp-2 leading-relaxed text-gray-600">
															{event.excerpt}
														</p>

														<div
															class="mb-4 flex flex-wrap items-center gap-6 text-sm text-gray-500"
														>
															<div class="flex items-center">
																<MapPin class="mr-2 h-4 w-4" />
																{event.location}
															</div>
															{#if event.maxParticipants}
																<div class="flex items-center">
																	<Users class="mr-2 h-4 w-4" />
																	{event.maxParticipants} osalejat
																</div>
															{/if}
															{#if event.price}
																<div class="flex items-center font-semibold text-gray-900">
																	€{event.price}
																</div>
															{/if}
														</div>
													</div>

													<!-- Action Button -->
													<div class="flex justify-end">
														<Button
															variant="outline"
															class="group relative rounded-lg px-8 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
															onclick={() =>
																(window.location.href = `/uritused/${event.pageSlug || event.id}`)}
														>
															Vaata täpsemalt
															<ArrowRight class="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1" />
														</Button>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
