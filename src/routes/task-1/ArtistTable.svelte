<script lang="ts">
	import type { ArtistInteraction } from '$lib/types';
	import { formatDuration } from '$lib/utils/formatDuration';

	type ArtistTableProps = {
		artistInteractions: ArtistInteraction[];
	};

	const { artistInteractions }: ArtistTableProps = $props();
</script>

<div class="overflow-x-auto">
	<div class="scrollbar-pretty relative h-[60rem] w-[60rem] min-w-max overflow-y-auto">
		<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
			<thead
				class="sticky top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th scope="col" class="px-6 py-3">Artist Id</th>
					<th scope="col" class="px-6 py-3">Artist Name</th>
					<th scope="col" class="px-6 py-3">Total Time Spent</th>
					<th scope="col" class="px-6 py-3">Total Unique Visitors</th>
				</tr>
			</thead>
			<tbody>
				{#each artistInteractions as { artist_id, artist_name, total_visit_duration, total_unique_visitors }}
					<tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
						<td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
							{artist_id}
						</td>
						<td class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
							{artist_name}
						</td>
						<td class="px-6 py-4">
							{formatDuration(total_visit_duration)}
						</td>
						<td class="px-6 py-4">
							{total_unique_visitors}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	/* Custom scrollbar styles */
	.scrollbar-pretty::-webkit-scrollbar {
		width: 10px;
	}

	.scrollbar-pretty::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}

	.scrollbar-pretty::-webkit-scrollbar-thumb {
		background: rgba(149, 158, 160, 0.5);
		border-radius: 5px;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.scrollbar-pretty::-webkit-scrollbar-thumb:hover {
		background: rgba(100, 100, 100, 0.7);
	}
</style>
