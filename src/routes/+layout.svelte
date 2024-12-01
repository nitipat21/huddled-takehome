<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
</script>

<main class="h-screen w-full bg-slate-200 dark:bg-slate-950 dark:text-slate-200">
	<nav class="flex max-w-64 items-center justify-between gap-4 p-2">
		<a
			href="/task-1"
			class="w-full rounded p-2 text-center text-lg font-semibold {$page.url.pathname === '/task-1'
				? 'bg-sky-600'
				: 'dark:bg-sky-800/20'}">Task 1</a
		>
		<a
			href="/task-2"
			class="w-full rounded p-2 text-center text-lg font-semibold {$page.url.pathname === '/task-2'
				? 'bg-sky-600'
				: 'dark:bg-sky-800/20'}">Task 2</a
		>
	</nav>
	<slot></slot>
</main>
