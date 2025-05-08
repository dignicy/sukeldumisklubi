<script lang="ts">
	import { PUBLIC_APP_NAME, PUBLIC_ORIGIN } from '$env/static/public';

	let { data } = $props();
	let blogs = $derived(data.blogs);

	let seo = $state({
		title: `Blog - ${PUBLIC_APP_NAME}`,
		description: `Read the latest articles and updates from the ${PUBLIC_APP_NAME} team`,
		canonicalUrl: `${PUBLIC_ORIGIN}/blog`
	});
</script>



<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16  min-h-screen">
	<div class="max-w-2xl mx-auto text-center mb-16">
        <h1 class="text-3xl -rotate-2 text-neutral-900 font-bold inline-flex items-center gap-2 p-2 border rounded-lg px-4 shadow-inner bg-white">Blog</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 mt-4">
			Stay updated with the latest news, tutorials, and insights from the {PUBLIC_APP_NAME} team.
		</p>
	</div>

	<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-4">
		{#each blogs as blog}
			<article
				class="group bg-white dark:bg-gray-800 rounded-xl border overflow-hidden dark:border-gray-700 hover:shadow-lg transition-all duration-200"
			>
				<a href="/blog/{blog.slug}" class="block">
					{#if blog.cover}
						<div class="relative overflow-hidden">
							<img
								src="/images/{blog.cover}?thumb=600x400"
								alt={blog.title}
								class="w-full h-52 object-cover transform group-hover:scale-105 transition-transform duration-200"
							/>
						</div>
					{/if}
					<div class="p-6">
						<div class="flex items-center gap-2 mb-4">
							<time
								datetime={blog.created}
								class="text-sm font-medium text-primary-600 dark:text-primary-400"
							>
								{new Date(blog.created).toLocaleString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric'
								})}
							</time>
							{#if blog.category}
								<span class="text-sm text-gray-500 dark:text-gray-400">•</span>
								<span class="text-sm font-medium text-gray-500 dark:text-gray-400"
									>{blog.category}</span
								>
							{/if}
						</div>
						<h2
							class="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
						>
							{blog.title}
						</h2>
						<p class="text-gray-600 dark:text-gray-300 line-clamp-2">{blog.description}</p>
					</div>
				</a>
			</article>
		{/each}
	</div>
</div>

