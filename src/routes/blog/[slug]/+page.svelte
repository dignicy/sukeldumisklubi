<script lang="ts">
	import { PUBLIC_APP_NAME, PUBLIC_ORIGIN } from '$env/static/public';
    import Markdown from 'svelte-exmarkdown';

    let {
        data
    } = $props();

    let blog = $derived(data.blog);
  </script>


  <div class="max-w-prose mx-auto  px-4 pt-32 pb-4">
      <address class="flex items-center mb-6 not-italic w-full">
          <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <img class="mr-4 w-16 h-16 rounded-full" src="https://i.pravatar.cc/300" alt="Blog author"> 
              <div>
                  <div  class="text-xl font-bold text-gray-900 dark:text-white">Your name</div>
                   <p class="text-base text-gray-500 dark:text-gray-400">Your job title</p>
                    <p class="text-base text-gray-500 dark:text-gray-400">
                      <time datetime="{blog.created}" title="{new Date(blog.created).toLocaleDateString()}">{new Date(blog.created).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                  </p>
              </div>
          </div>
      </address>
    <h1 class="text-2xl font-bold">{blog.title}</h1>
</div>
    <div class="pb-8 prose">
        <Markdown md={blog.content} />
    </div>

