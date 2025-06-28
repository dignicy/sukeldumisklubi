<script lang="ts">
	import Button from "@/components/ui/button/button.svelte";
	import Input from "@/components/ui/input/input.svelte";
	import Label from "@/components/ui/label/label.svelte";
	import { cn } from "$lib/utils.js";
	import { Loader2 } from "lucide-svelte";

	let {
        class: className,
        ...props
    } = $props();

	let isLoading = $state(false);
</script>

<div class={cn("grid gap-6", className)} {...props}>
	<form method="POST" action="?/login">
		<div class="grid gap-4">
			<div class="grid gap-3">
				<Label for="email" class="text-white font-medium">Email</Label>
				<Input 
					name="email" 
					id="email"
					placeholder="Enter your email" 
					required 
					autocomplete="email" 
					type="email"
					class="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-orange-400 focus:ring-orange-400"
				/>
				<Label for="password" class="text-white font-medium">Password</Label>
				<Input 
					name="password" 
					id="password"
					placeholder="Enter your password" 
					required 
					type="password"
					class="bg-white/10 border-white/30 text-white placeholder:text-white/60 focus:border-orange-400 focus:ring-orange-400"
				/>
			</div>
			<Button 
				type="submit" 
				disabled={isLoading}
				class="bg-orange-600 hover:bg-orange-700 text-white border-none mt-2 py-3"
			>
				{#if isLoading}
					<Loader2 class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign In
			</Button>
		</div>
	</form>
</div>