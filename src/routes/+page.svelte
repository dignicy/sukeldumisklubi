<script lang="ts">
import { Button } from "$lib/components/ui/button";
import { Separator } from "$lib/components/ui/separator";
import { Card, CardContent } from "$lib/components/ui/card";
import { ArrowRight, MapPin, Phone, Mail, Clock, Waves, Users, Award, Calendar, Star, CheckCircle } from "lucide-svelte";

import Hero from "$lib/components/ui/blocks/home/hero.svelte";
import Services from "$lib/components/ui/blocks/home/services.svelte";
import EventsCalendar from "$lib/components/ui/blocks/home/events-calendar.svelte";
import Safaris from "$lib/components/ui/blocks/home/safaris.svelte";
import Contact from "$lib/components/ui/blocks/home/contactsection.svelte";
import Footer from "$lib/components/ui/blocks/footer.svelte";

import type { PageData } from './$types';
import type { DiveEvent } from '$lib/types/events';

interface Props {
	data: PageData;
}

let { data }: Props = $props();

let isVisible = $state(false);

function handleScroll() {
	isVisible = window.scrollY > 100;
}
</script>

<svelte:head>
	<title>Sukeldumisklubi - Sukeldumiskursused, varustus ja reisid Tartus</title>
	<meta name="description" content="Tartu sukeldumisklubi pakub sukeldumiskursuseid, varustuse renti ja sukeldumisreise. PADI ja IANTD koolitused algajatele ja edasijõudnutele." />
</svelte:head>

<svelte:window on:scroll={handleScroll} />

<Hero />
<Services />
<Safaris />
<Contact />



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
	
	@keyframes float {
		0%, 100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	
	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
		opacity: 0;
	}
	
	.animate-float {
		animation: float 3s ease-in-out infinite;
	}
</style>
