<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { ArrowLeft, BarChart3 } from 'lucide-svelte';
</script>

<svelte:head>
    <title>Analüütika - Administraatori Töölaud</title>
    <meta name="description" content="Veebilehe analüütika ja kasutajate tegevuse mõõdikud" />
    <!-- SEO Exclusions -->
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
    <meta name="googlebot" content="noindex, nofollow" />
    <script async src="https://mango.dignicy.com/js/embed.host.js"></script>
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <Button href="/dashboard" variant="ghost" size="sm" class="mr-4">
                        <ArrowLeft class="h-4 w-4 mr-2" />
                        Tagasi töölaudale
                    </Button>
                    <h1 class="text-2xl font-bold text-gray-900">Analüütika</h1>
                    <Badge variant="secondary" class="ml-3">
                        <BarChart3 class="h-3 w-3 mr-1" />
                        Analytics
                    </Badge>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Analytics Card -->
        <Card>
            <CardHeader>
                <CardTitle class="flex items-center">
                    <BarChart3 class="h-5 w-5 mr-2 text-orange-600" />
                    Veebilehe analüütika
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="space-y-4">
                    <p class="text-sm text-muted-foreground">
                        Vaata veebilehe külastajate statistikat, populaarseid lehti ja muud analüütikat.
                    </p>
                    
                    <!-- Plausible Analytics Embed -->
                    <div class="w-full overflow-hidden rounded-lg border bg-white">
                        <iframe 
                            plausible-embed 
                            src="https://mango.dignicy.com/share/sukeldumisklubi.ee?auth=-aBC_vXZx2AXA-wwHUbhe&embed=true&theme=light" 
                            scrolling="no" 
                            frameborder="0" 
                            loading="lazy" 
                            style="width: 1px; min-width: 100%; height: 1600px;"
                            title="Plausible Analytics Dashboard"
                        ></iframe>
                    </div>
                    
                    <div style="font-size: 14px; padding-bottom: 14px;">
                        Stats powered by 
                        <a 
                            target="_blank" 
                            style="color: #4F46E5; text-decoration: underline;" 
                            href="https://plausible.io"
                        >
                            Plausible Analytics
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    </main>
</div> 