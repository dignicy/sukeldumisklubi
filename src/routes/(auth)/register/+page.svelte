<script lang="ts">
	import Alert from '@/components/ui/alert/alert.svelte';
	import UserAuthForm from '@/user-auth-form.svelte';
	import { Button } from '@/components/ui/button';
	import { PUBLIC_APP_NAME } from '$env/static/public';

	export let form;
</script>

<div
	class="container  relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="/login"
		variant="ghost"
		class="absolute right-4 top-4 md:right-8 md:top-8"
	>
		Login
	</Button>
	<div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
	url(/background.jpg);"		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			 Logo
			{PUBLIC_APP_NAME}
		</div>
	
	</div>
	<div class="lg:p-8 h-screen flex items-center justify-center ">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Create an account</h1>
				<p class="text-muted-foreground text-sm">
					Enter your email below to create your account
				</p>
			</div>
			<UserAuthForm class="w-full" />
			
			{#if form?.errorMessage}
			<Alert>{form?.errorMessage}</Alert>
			{/if}

			{#if form?.message}
			<Alert variant="default">{form?.message}</Alert>
			{/if}

			<p class="text-muted-foreground px-8 text-center text-sm">
				By signing up, you agree to our
				<a href="/terms" class="hover:text-primary underline underline-offset-4">
					Terms of Service
				</a>
				and
				<a href="/privacy" class="hover:text-primary underline underline-offset-4">
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>

