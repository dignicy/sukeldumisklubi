<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { Users, Calendar, LogOut, BarChart3 } from 'lucide-svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<svelte:head>
    <title>Administraatori Töölaud - {data.user.email}</title>
    <meta name="description" content="Administraatori töölaud sukeldumisklubi veebilehe haldamiseks" />
    <!-- SEO Exclusions -->
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
    <meta name="googlebot" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold text-gray-900">Administraatori Töölaud</h1>
                    <Badge variant="secondary" class="ml-3">Admin</Badge>
                </div>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-600">Tere tulemast, {data.user.email}</span>
                    <Button href="/logout" variant="outline" size="sm">
                        <LogOut class="h-4 w-4 mr-2" />
                        Logi välja
                    </Button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Ootel registreerimised</CardTitle>
                    <Users class="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold text-yellow-600">{data.stats.pendingRegistrations}</div>
                    <p class="text-xs text-muted-foreground">Vajab kinnitust</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Kokku registreerimisi</CardTitle>
                    <Users class="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{data.stats.totalRegistrations}</div>
                    <p class="text-xs text-muted-foreground">Kõik ajad</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Kliente</CardTitle>
                    <Users class="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{data.stats.totalClients}</div>
                    <p class="text-xs text-muted-foreground">Andmebaasis</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle class="text-sm font-medium">Üritusi</CardTitle>
                    <Calendar class="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                    <div class="text-2xl font-bold">{data.stats.totalEvents}</div>
                    <p class="text-xs text-muted-foreground">Plaanitud</p>
                </CardContent>
            </Card>
        </div>

        <!-- Management Sections -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card class="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <Users class="h-5 w-5 mr-2 text-blue-600" />
                        Registreerimised
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm text-muted-foreground mb-4">
                        Halda ürituste registreerimisi ja kinnita osavõtjaid.
                    </p>
                    <Button class="w-full" variant="outline" href="/dashboard/registrations">
                        Vaata registreerimisi
                    </Button>
                </CardContent>
            </Card>

            <Card class="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <Users class="h-5 w-5 mr-2 text-green-600" />
                        Kliendid
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm text-muted-foreground mb-4">
                        Halda klientide andmebaasi ja vaata nende ajalugu.
                    </p>
                    <Button class="w-full" variant="outline" href="/dashboard/clients">
                        Halda kliente
                    </Button>
                </CardContent>
            </Card>

            <Card class="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <Calendar class="h-5 w-5 mr-2 text-green-600" />
                        Ürituste haldamine
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm text-muted-foreground mb-4">
                        Halda sukeldumisüritusi PocketBase administraatori liideses.
                    </p>
                    <Button class="w-full" variant="outline" href="https://pb.sukeldumisklubi.ee/_/#/collections?collection=pbc_1687431684">
                        Halda üritusi
                    </Button>
                </CardContent>
            </Card>

            <Card class="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle class="flex items-center">
                        <BarChart3 class="h-5 w-5 mr-2 text-orange-600" />
                        Analüütika
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-sm text-muted-foreground mb-4">
                        Vaata veebilehe analüütikat ja kasutajate tegevuse mõõdikuid.
                    </p>
                    <Button class="w-full" variant="outline" href="/dashboard/analytics">
                        Vaata analüütikat
                    </Button>
                </CardContent>
            </Card>
        </div>

        <!-- Quick Admin Links Section -->
        <Card class="mt-8">
            <CardHeader>
                <CardTitle>Kiired administraatori lingid</CardTitle>
            </CardHeader>
            <CardContent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <h4 class="font-medium">PocketBase Admin</h4>
                        <p class="text-sm text-muted-foreground">
                            Ava PocketBase administraatori liides otsese andmebaasi haldamise jaoks.
                        </p>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onclick={() => window.open('https://pb.sukeldumisklubi.ee/_/', '_blank')}
                        >
                            Ava PocketBase Admin
                        </Button>
                    </div>
                    <div class="space-y-2">
                        <h4 class="font-medium">Peamine veebileht</h4>
                        <p class="text-sm text-muted-foreground">
                            Tagasi peamisele veebilehele, et vaadata seda tavalise kasutajana.
                        </p>
                        <Button variant="outline" size="sm" href="/">
                            Vaata veebilehte
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </main>
</div> 