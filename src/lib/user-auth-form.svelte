<script lang="ts">
	import Button from "@/components/ui/button/button.svelte";
	import Input from "@/components/ui/input/input.svelte";
	import Label from "@/components/ui/label/label.svelte";
	import { cn } from "$lib/utils.js";
	import { Loader2 } from "lucide-svelte";
	import { pb } from "@/pocketbase/client";
	import { goto } from "$app/navigation";

	let {
        class: className,
        ...props
    } = $props();


	let isLoading = $state(false);
	async function onSubmit(event: Event) {
		isLoading = true;
		try {
			// Continue form submission
			(event.target as HTMLFormElement).submit();
		} finally {
			isLoading = false;
		}
	}


	async function oauthLogin(provider: string) {
		try {
			const login = await pb.collection('users').authWithOAuth2({ provider });
			// Redirect
			goto("/callback/" + provider + "?token=" + login.token);
		} catch (error) {
			console.error('OAuth login failed:', error);
		}
	}

</script>

<div class={cn("grid gap-6", className)}>
	<form method="POST" onsubmit={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-1">
                <Label class="sr-only" for="email">Email</Label>
				<Input name="email" placeholder="Email" required autocomplete="email" type="email" />
				<Label class="sr-only" for="password">Password</Label>
				<Input name="password" placeholder="Password" required type="password" />
				<Label class="sr-only" for="passwordConfirm">Confirm Password</Label>
				<Input name="passwordConfirm" placeholder="Confirm Password" required type="password" />
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign Up with Email
			</Button>
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
	<form onsubmit={() => oauthLogin('google')} class="w-full">
		<Button type="submit" variant="outline" class="w-full" disabled={isLoading}>
			{#if isLoading}
				<Loader2 class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			<img src="/Googlelogo.svg" class="w-4 h-4" />
		{/if}
		Sign up with Google
	</Button>
	</form>
</div>