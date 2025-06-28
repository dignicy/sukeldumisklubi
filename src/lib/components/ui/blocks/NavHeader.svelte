<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// Import Lucide icons
	import { 
		MapPin, 
		Shield, 
		HelpCircle, 
		Zap, 
		BookOpen, 
		Star, 
		Heart, 
		Settings, 
		Award, 
		Trophy, 
		ShoppingBag, 
		Wrench, 
		Plane, 
		Camera, 
		Mail, 
		ChevronDown,
		Menu,
		X,
		ArrowRight,
		Calendar
	} from 'lucide-svelte';

	// Reactive state using Svelte 5 runes
	let isMobileMenuOpen = $state(false);
	let activeDropdown = $state<string | null>(null);
	let expandedTechnical = $state(false);
	let expandedMobileMenu = $state<string | null>(null);
	let isScrolled = $state(false);
	let closeTimeout: number | null = $state(null);
	
	// Elements for smooth positioning
	let navElement: HTMLElement | null = $state(null);
	let menuItemElements: { [key: string]: HTMLElement } = $state({});
	let dropdownPosition = $state({ left: 0, width: 400 });
	let isVisible = $state(false);
	let isContentReady = $state(false);

	// Menu structure with Lucide icon components
	const menuItems = [
		{
			label: 'Sukeldumine',
			children: [
				{ 
					label: 'Sukeldumiskohad', 
					href: '/sukeldumiskohad',
					description: 'Avasta Eesti parimaid sukeldumiskohti',
					icon: MapPin
				},
				{ 
					label: 'Ohutusreeglid', 
					href: '/sukeldumise-ohutusreeglid',
					description: 'Turvaline sukeldumine meie juhendite järgi',
					icon: Shield
				},
				{ 
					label: 'Korduma kippuvad küsimused', 
					href: '/korduma-kippuvad-kusimused',
					description: 'Vastused kõige sagedamini esitatud küsimustele',
					icon: HelpCircle
				}
			]
		},
		{
			label: 'Sukeldumiskursused',
			href: '/kursused',
			children: [
				{ 
					label: 'Proovisukeldumine', 
					href: '/proovisukeldumine',
					description: 'Sinu esimene samm vee alla',
					icon: Zap
				},
				{ 
					label: 'Sukeldumiskursused algajatele', 
					href: '/sukeldumiskursused-algajatele',
					description: 'Õpi sukeldumise põhitõed',
					icon: BookOpen
				},
				{ 
					label: 'Sukeldumiskursused edasijõudnutele', 
					href: '/sukeldumiskursused-edasijõudnutele',
					description: 'Sügava vee ja keeruliste tingimuste kursused',
					icon: Star
				},
				{ 
					label: 'Esmaabi koolitus', 
					href: '/efr-esmaabikoolitus',
					description: 'Elupäästva esmaabi oskused sukeldujatele',
					icon: Heart
				},
				{
					label: 'Tehniline sukeldumine',
					href: '/tehniline-sukeldumine',
					description: 'Professionaalne taseme koolitus',
					icon: Settings,
					hasDropdown: true,
					children: [
						{ 
							label: 'IANTD koolitused', 
							href: '/tehniline-sukeldumine/iantd-koolitused',
							description: 'Rahvusvaheliselt tunnustatud sertifikaadid',
							icon: Award
						},
						{ 
							label: 'TDI koolitused', 
							href: '/tehniline-sukeldumine/tdi-koolitused',
							description: 'Tehnilise sukeldumise spetsialistid',
							icon: Trophy
						}
					]
				}
			]
		},
		{
			label: 'Sukeldumisvarustus',
			href: '',
			children: [
				{ 
					label: 'Sukeldumisvarustuse rent', 
					href: '/sukeldumisvarustuse-rent',
					description: 'Kvaliteetne varustus mõistliku hinnaga',
					icon: ShoppingBag
				},
				{ 
					label: 'Sukeldumisvarustuse hooldus', 
					href: '/sukeldumisvarustuse-hooldus',
					description: 'Professionaalne hooldus ja remont',
					icon: Wrench
				}
			]
		},
		{ 
			label: 'Üritustekalender', 
			href: '/uritused',
			icon: Calendar
		},
		{ 
			label: 'Kontakt', 
			href: '/kontakt',
			icon: Mail
		}
	];

	// Get current menu items for active dropdown using $derived
	let currentMenuItems = $derived(
		activeDropdown ? menuItems.find(item => item.label === activeDropdown)?.children || [] : []
	);

	// Handle scroll effect and cleanup
	onMount(() => {
		if (!browser) return;

		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			// Clean up timeout on unmount
			if (closeTimeout) {
				clearTimeout(closeTimeout);
			}
		};
	});

	// Toggle mobile menu
	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
		expandedMobileMenu = null;
		if (isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	// Handle mobile submenu expansion
	function toggleMobileSubmenu(itemLabel: string) {
		expandedMobileMenu = expandedMobileMenu === itemLabel ? null : itemLabel;
	}

	// Clean, simple dropdown logic
	function openDropdown(itemLabel: string) {
		// Cancel any pending close
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		// Open the dropdown immediately
		activeDropdown = itemLabel;
		expandedTechnical = false;
	}

	function scheduleClose() {
		// Only schedule if not already scheduled
		if (!closeTimeout) {
			closeTimeout = setTimeout(() => {
				activeDropdown = null;
				expandedTechnical = false;
				closeTimeout = null;
			}, 300) as unknown as number; // Generous 500ms timeout
		}
	}

	function cancelClose() {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
	}

	function openTechnical() {
		expandedTechnical = true;
	}

	function closeTechnical() {
		expandedTechnical = false;
	}

	// Close mobile menu when clicking outside
	function closeMobileMenu() {
		isMobileMenuOpen = false;
		expandedMobileMenu = null;
		document.body.style.overflow = '';
	}
</script>

<!-- Navigation Header -->
<header class="fixed left-0 right-0 z-50 transition-all duration-500 ease-out {isScrolled ? 'top-4' : 'top-8'}">
	<!-- Match the exact hero section spacing: py-4 px-4 for outer, then container mx-auto px-6 lg:px-8 -->
	<div class="mx-auto py-4 px-4">
		<nav 
			class="container mx-auto px-4 lg:px-4 rounded-2xl transition-all duration-300 {isScrolled
				? 'bg-white/95 backdrop-blur-xl shadow-md border border-black/20'
				: 'bg-white/10 backdrop-blur-sm border border-white/20'}"
			bind:this={navElement}
		>
			<div class="flex items-center justify-between h-16 px-0 lg:px-0">
				<!-- Logo -->
				<div class="flex-shrink-0">
					<a href="/" class="flex items-center space-x-3 group">
						<img 
							src={isScrolled ? '/logos/Sukeldumisklubi_Orange_Blacktxt.svg' : '/logos/Sukeldumisklubi_Orange_Whitetxt.svg'}
							alt="Sukeldumisklubi"
							class="h-16 w-auto transition-all duration-300 group-hover:scale-105"
						/>
					</a>
				</div>

				<!-- Desktop Navigation -->
				<div class="hidden lg:flex items-center space-x-1">
					{#each menuItems as item}
						<div
							class="relative"
							onmouseenter={() => item.children && openDropdown(item.label)}
							onmouseleave={scheduleClose}
						>
							<a
								href={item.href}
								class="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 {isScrolled
									? 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
									: 'text-white/90 hover:text-white hover:bg-white/10'} flex items-center space-x-1 relative z-20"
							>
								<span>{item.label}</span>
								{#if item.children}
									<ChevronDown
										class="w-4 h-4 transform transition-transform duration-300 {activeDropdown === item.label ? 'rotate-180' : ''}"
									/>
								{/if}
							</a>

							<!-- Individual Dropdown for Each Menu Item -->
							{#if item.children && activeDropdown === item.label}
								<div
									class="absolute top-full left-0 mt-0 bg-white rounded-2xl shadow-2xl border border-gray-100 z-10 overflow-hidden transition-all duration-200 ease-out"
									style="width: {item.label === 'Sukeldumiskursused' ? '480px' : '400px'};"
									onmouseenter={cancelClose}
									onmouseleave={scheduleClose}
								>
									<div class="p-6">
										<!-- Header -->
										<div class="mb-6 pb-4 border-b border-gray-100">
											<h3 class="text-lg font-semibold text-gray-900">
												{item.label}
											</h3>
											<p class="text-sm text-gray-500 mt-1">
												Vali sobiv teenus oma vajadustele
											</p>
										</div>

										<!-- Menu Items -->
										<div class="grid grid-cols-1 gap-3">
											{#each currentMenuItems as child, index}
												<div 
													class="relative transition-all duration-200 ease-out"
													style="transition-delay: {index * 50}ms;"
												>
													<!-- Main Item with Optional Hover Dropdown -->
													<div
														class="relative"
														onmouseenter={child.hasDropdown ? openTechnical : undefined}
														onmouseleave={child.hasDropdown ? closeTechnical : undefined}
													>
														<a
															href={child.href}
															class="block p-4 rounded-xl hover:bg-orange-50 transition-all duration-200 group/item border border-transparent hover:border-orange-100"
														>
															<div class="flex items-start space-x-4">
																<!-- Icon -->
																<div class="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover/item:bg-orange-500 transition-all duration-200">
																	<svelte:component 
																		this={child.icon} 
																		class="w-5 h-5 text-orange-600 group-hover/item:text-white transition-colors duration-200"
																	/>
																</div>
																
																<!-- Content -->
																<div class="flex-1 min-w-0">
																	<div class="flex items-center justify-between">
																		<div>
																			<h4 class="text-sm font-medium text-gray-900 group-hover/item:text-orange-600 transition-colors duration-200">
																				{child.label}
																			</h4>
																			{#if child.description}
																				<p class="text-xs text-gray-500 mt-1 group-hover/item:text-gray-600 transition-colors duration-200">
																					{child.description}
																				</p>
																			{/if}
																		</div>
																	
																		<!-- Arrow for items with children -->
																		{#if child.hasDropdown && child.children}
																			<ChevronDown 
																				class="w-4 h-4 text-gray-400 group-hover/item:text-orange-500 transform transition-all duration-200 {expandedTechnical ? 'rotate-180' : ''}"
																			/>
																		{/if}
																	</div>
																</div>
															</div>
														</a>

														<!-- Sub-items (for technical diving) -->
														{#if child.hasDropdown && child.children}
															<div 
																class="overflow-hidden transition-all duration-300 ease-out {expandedTechnical ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}"
															>
																<div class="mt-2 ml-14 space-y-2 pb-2">
																	{#each child.children as subChild}
																		<a
																			href={subChild.href}
																			class="block p-3 rounded-lg hover:bg-orange-50 transition-all duration-200 group/sub border border-transparent hover:border-orange-100"
																		>
																			<div class="flex items-start space-x-3">
																				<!-- Icon -->
																				<div class="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover/sub:bg-orange-500 transition-all duration-200">
																					<svelte:component 
																						this={subChild.icon} 
																						class="w-4 h-4 text-orange-600 group-hover/sub:text-white transition-colors duration-200"
																					/>
																				</div>
																				
																				<!-- Content -->
																				<div class="flex-1 min-w-0">
																						<h5 class="text-sm font-medium text-gray-900 group-hover/sub:text-orange-600 transition-colors duration-200">
																							{subChild.label}
																						</h5>
																						<p class="text-xs text-gray-500 mt-1 group-hover/sub:text-gray-600 transition-colors duration-200">
																							{subChild.description}
																						</p>
																				</div>
																			</div>
																		</a>
																	{/each}
																</div>
															</div>
														{/if}
													</div>
												</div>
											{/each}
										</div>


									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Mobile Menu Button -->
				<button
					onclick={toggleMobileMenu}
					class="lg:hidden relative w-10 h-10 rounded-lg {isScrolled
						? 'bg-gray-100 hover:bg-gray-200'
						: 'bg-white/10 hover:bg-white/20'} transition-all duration-300 flex items-center justify-center group"
					aria-label="Toggle menu"
				>
					<div class="w-5 h-5 relative">
						{#if isMobileMenuOpen}
							<X class="w-5 h-5 {isScrolled ? 'text-gray-700' : 'text-white'} transform transition-all duration-300 rotate-90 group-hover:scale-110" />
						{:else}
							<Menu class="w-5 h-5 {isScrolled ? 'text-gray-700' : 'text-white'} transform transition-all duration-300 group-hover:scale-110" />
						{/if}
					</div>
				</button>
			</div>
		</nav>
	</div>

	<!-- Professional Mobile Menu Overlay -->
	{#if isMobileMenuOpen}
		<!-- Clean Background -->
		<div
			class="lg:hidden fixed inset-0 z-40 bg-white transition-all duration-500 ease-out"
			style="transform: translateY({isMobileMenuOpen ? '0' : '-100%'}); opacity: {isMobileMenuOpen ? '1' : '0'};"
		>
			<!-- Content Container -->
			<div class="relative h-full flex flex-col">
				<!-- Simple Header -->
				<div 
					class="px-6 pt-6 pb-4 border-b border-gray-100 transition-all duration-700 ease-out"
					style="transform: translateY({isMobileMenuOpen ? '0' : '-20px'}); opacity: {isMobileMenuOpen ? '1' : '0'}; transition-delay: 100ms;"
				>
					<div class="flex items-center justify-between">
						<div>
							<h2 class="text-xl font-semibold text-gray-900">
								Navigatsioon
							</h2>
							<p class="text-sm text-gray-500 mt-1">Vali teenus</p>
						</div>
						<button
							onclick={closeMobileMenu}
							class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
						>
							<X class="w-5 h-5 text-gray-600" />
						</button>
					</div>
				</div>

				<!-- Clean Menu Content -->
				<div class="flex-1 overflow-y-auto px-6 py-6">
					<div class="space-y-2">
						{#each menuItems as item, index}
							<div 
								class="transition-all duration-500 ease-out"
								style="transform: translateX({isMobileMenuOpen ? '0' : '-20px'}); opacity: {isMobileMenuOpen ? '1' : '0'}; transition-delay: {(index + 2) * 100}ms;"
							>
								{#if item.children}
									<!-- Parent Menu Item with Children -->
									<div class="border border-gray-200 rounded-lg overflow-hidden">
										<button
											onclick={() => toggleMobileSubmenu(item.label)}
											class="w-full p-4 text-left hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
										>
											<div class="flex items-center justify-between">
												<div class="flex items-center space-x-3">
													<div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
														<svelte:component 
															this={item.children[0]?.icon} 
															class="w-4 h-4 text-orange-600"
														/>
													</div>
													<div>
														<h3 class="text-base font-medium text-gray-900">
															{item.label}
														</h3>
														<p class="text-sm text-gray-500">
															{item.children.length} teenust
														</p>
													</div>
												</div>
												<ChevronDown 
													class="w-5 h-5 text-gray-400 transform transition-all duration-300 {expandedMobileMenu === item.label ? 'rotate-180' : ''}"
												/>
											</div>
										</button>

										<!-- Submenu Items -->
										<div 
											class="overflow-hidden transition-all duration-300 ease-out {expandedMobileMenu === item.label ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}"
										>
											<div class="bg-gray-50">
												{#each item.children as child}
													<a
														href={child.href}
														onclick={closeMobileMenu}
														class="block p-4 hover:bg-white transition-all duration-200 border-b border-gray-200 last:border-b-0"
													>
														<div class="flex items-center justify-between">
															<div class="flex items-center space-x-3">
																<div class="w-6 h-6 bg-white rounded-md flex items-center justify-center shadow-sm">
																	<svelte:component 
																		this={child.icon} 
																		class="w-3 h-3 text-orange-600"
																	/>
																</div>
																<div>
																	<h4 class="text-sm font-medium text-gray-900">
																		{child.label}
																	</h4>
																	{#if child.description}
																		<p class="text-xs text-gray-500 mt-1">
																			{child.description}
																		</p>
																	{/if}
																</div>
															</div>
															<ArrowRight class="w-4 h-4 text-gray-400" />
														</div>

														<!-- Technical Sub-items -->
														{#if child.hasDropdown && child.children}
															<div class="mt-3 ml-9 space-y-2 pb-2">
																{#each child.children as subChild}
																	<a
																		href={subChild.href}
																		onclick={closeMobileMenu}
																		class="block p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
																	>
																		<div class="flex items-center space-x-3">
																			<div class="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
																				<svelte:component 
																					this={subChild.icon} 
																					class="w-3 h-3 text-gray-600"
																				/>
																			</div>
																			<span class="text-sm text-gray-700">
																				{subChild.label}
																			</span>
																		</div>
																	</a>
																{/each}
															</div>
														{/if}
													</a>
												{/each}
											</div>
										</div>
									</div>
								{:else}
									<!-- Single Menu Item -->
									<a
										href={item.href}
										onclick={closeMobileMenu}
										class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
									>
										<div class="flex items-center justify-between">
											<div class="flex items-center space-x-3">
																							<div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
												<svelte:component 
													this={item.icon} 
													class="w-4 h-4 text-orange-600"
												/>
											</div>
												<h3 class="text-base font-medium text-gray-900">
													{item.label}
												</h3>
											</div>
											<ArrowRight class="w-4 h-4 text-gray-400" />
										</div>
									</a>
								{/if}
							</div>
						{/each}
					</div>
				</div>

				<!-- Simple Footer -->
				<div 
					class="px-6 py-4 border-t border-gray-100 transition-all duration-700 ease-out"
					style="transform: translateY({isMobileMenuOpen ? '0' : '20px'}); opacity: {isMobileMenuOpen ? '1' : '0'}; transition-delay: {(menuItems.length + 3) * 100}ms;"
				>
					<a 
						href="/kontakt"
						onclick={closeMobileMenu}
						class="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-all duration-200"
					>
						<Mail class="w-4 h-4" />
						<span>Kontakt</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Simple Backdrop -->
		<div
			class="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-500"
			style="opacity: {isMobileMenuOpen ? '1' : '0'};"
			onclick={closeMobileMenu}
		></div>
	{/if}
</header>

<style>
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-slide-in {
		animation: slide-in 0.4s ease-out forwards;
		opacity: 0;
	}

	.animate-slide-down {
		animation: slide-down 0.3s ease-out forwards;
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out forwards;
	}
</style>
