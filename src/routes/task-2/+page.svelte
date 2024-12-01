<script lang="ts">
	import ArtistEngagementByDay from './ArtistEngagementsByDay.svelte';
	import ArtistEngagementByHour from './ArtistEngagementsByHour.svelte';

	const { data } = $props();
	const { heatmapDataByHour, heatmapDataByDay } = data;
</script>

<div class="grid gap-4 p-8">
	<ArtistEngagementByHour data={heatmapDataByHour} />
	<ArtistEngagementByDay data={heatmapDataByDay} />
</div>
