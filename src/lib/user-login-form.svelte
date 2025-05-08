<script lang="ts">
	import Button from "@/components/ui/button/button.svelte";
	import Input from "@/components/ui/input/input.svelte";
	import Label from "@/components/ui/label/label.svelte";
	import { cn } from "$lib/utils.js";
	import { Loader2 } from "lucide-svelte";
	import { pb } from "@/pocketbase/client";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";

	let {
        class: className,
        ...props
    } = $props();

	let isLoading = $state(false);


	function setLocalStorage(key: string, value: string) {
		localStorage.setItem(key, value);
	}

	function getLocalStorage(key: string) {
		if (!browser) return null;
		return localStorage.getItem(key) || null;
	}

	async function oauthLogin(provider: string) {
		setLocalStorage('loginOption', provider);
		const login = await pb.collection('users').authWithOAuth2({ provider });
		// send form data to the server
		goto("/callback/" + provider + "?token=" + login.token);
	}
</script>

<div class={cn("grid gap-6", className)} {...props}>
	<form method="POST" action="?/login">
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input name="email" placeholder="Email" required autocomplete="email" type="email" />
				<Label class="sr-only" for="password">Password</Label>
				<Input name="password" placeholder="Password" required type="password" />
			</div>
			<div class="flex flex-col gap-2 relative">
			{#if getLocalStorage('loginOption') === 'email'}
			<span class="absolute -top-2 -right-2 rotate-12 text-[10px] text-muted-foreground bg-white/80 border backdrop-blur-sm rounded-sm px-2 py-0.5">Last used</span>
			{/if}
			<Button type="submit" disabled={isLoading} onclick={() => setLocalStorage('loginOption', 'email')}>
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign In with Email
			</Button>
			</div>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
		</div>
	</div>
	<div class="flex flex-col gap-2 relative">
		{#if getLocalStorage('loginOption') === 'google'}
		<span class="absolute -top-2 -right-2 rotate-12 text-[10px] text-muted-foreground border backdrop-blur-sm rounded-sm px-2 py-0.5">Last used</span>
		{/if}
		<Button onclick={() => oauthLogin('google')} variant="outline" disabled={isLoading}>
			{#if isLoading}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<img src="/Googlelogo.svg" class="w-4 h-4" />
			{/if}
			Sign in with Google
		</Button>
	</div>
</div>