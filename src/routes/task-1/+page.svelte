<script lang="ts">
	import ArtistTable from './ArtistTable.svelte';

	const { data } = $props();
	const { artistInteractions } = data;
</script>

<div class="flex flex-col items-center justify-center">
	<ArtistTable {artistInteractions} />
</div>
