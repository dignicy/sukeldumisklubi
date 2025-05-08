<script lang="ts">
	import Alert from '@/components/ui/alert/alert.svelte';
	import { Button } from '@/components/ui/button';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import UserLoginForm from '@/user-login-form.svelte';

	export let form;
</script>

<div
	class="container  relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="/register"
		variant="ghost"
		class="absolute right-4 top-4 md:right-8 md:top-8"
	>
		Register
	</Button>
	<div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
		<div
			class="absolute inset-0 bg-cover"
			style="
				background-image:
					url(/background.jpg);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			Logo

			{PUBLIC_APP_NAME}
		</div>
		
	</div>
	<div class="lg:p-8 h-screen flex items-center justify-center ">
		<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">Login to your account</h1>
				<p class="text-muted-foreground text-sm">
					Enter your email below to login to your account
				</p>
			</div>
			<UserLoginForm class="w-full" />
			{#if form?.errorMessage}
				<Alert>{form?.errorMessage}</Alert>
			{/if}

		</div>
	</div>
</div>
