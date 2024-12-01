<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	type HeatmapData = {
		day: number;
		artist_id: number;
		artist_name: string;
		total_engagements: number;
	};

	type ArtistEngagementsByDayProps = {
		data: HeatmapData[];
	};

	const { data }: ArtistEngagementsByDayProps = $props();

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	onMount(() => {
		const container = d3.select('#heatmap-by-day-container');
		const containerWidth = (container.node() as HTMLElement).getBoundingClientRect().width;
		const containerHeight = containerWidth * 0.75;

		const margin = { top: 24, right: 16, bottom: 64, left: 96 };
		const width = containerWidth - margin.left - margin.right;
		const height = containerHeight - margin.top - margin.bottom;

		// Responsive SVG with viewBox
		const svg = container
			.append('svg')
			.attr('viewBox', `0 0 ${containerWidth} ${containerHeight}`)
			.attr('preserveAspectRatio', 'xMidYMid meet');

		const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

		// Scales
		const xScale = d3
			.scaleBand()
			.domain(data.map((d) => d.day.toString()))
			.range([0, width])
			.padding(0.05);

		const yScale = d3
			.scaleBand()
			.domain(data.map((d) => d.artist_id.toString()))
			.range([0, height])
			.padding(0.1);

		// Tooltip
		const tooltip = d3
			.select('#heatmap-by-day-container')
			.append('div')
			.style('position', 'absolute')
			.style('opacity', 0)
			.style('background', '#fff')
			.style('padding', '0.5rem')
			.style('border', '1px solid #ccc')
			.style('border-radius', '0.25rem')
			.style('font-size', '12px')
			.style('pointer-events', 'none');

		const artistIdToName = new Map(data.map((d) => [d.artist_id, d.artist_name]));
		const groupedData = d3.group(data, (d) => d.artist_id);

		// Heatmap Cells
		g.selectAll('.heatmap-cell')
			.data(data)
			.enter()
			.append('rect')
			.attr('x', (d) => xScale(d.day.toString())!)
			.attr('y', (d) => yScale(d.artist_id.toString())!)
			.attr('width', xScale.bandwidth())
			.attr('height', yScale.bandwidth())
			.attr('fill', (d) => {
				// Scale color based on Min and Max engagement of each artist
				const artistData = groupedData.get(d.artist_id) || [];
				const artistMin = d3.min(artistData, (d) => d.total_engagements) || 0;
				const artistMax = d3.max(artistData, (d) => d.total_engagements) || 0;
				const artistColorScale = d3
					.scaleSequential(d3.interpolateBlues)
					.domain([artistMin, artistMax]);

				return artistColorScale(d.total_engagements);
			})
			.on('mouseover', function (_, d) {
				tooltip.transition().duration(200).style('opacity', 1);
				tooltip.html(
					`${artistIdToName.get(d.artist_id)}<br>Day: ${daysOfWeek[d.day]}<br><b>Engagement: ${d.total_engagements}</b>`
				);
			})
			.on('mousemove', function (event) {
				tooltip.style('left', `${event.pageX + 12}px`).style('top', `${event.pageY + 12}px`);
			})
			.on('mouseout', function () {
				tooltip.transition().duration(500).style('opacity', 0);
			});

		// X-axis
		g.append('g')
			.attr('transform', `translate(0,${height})`)
			.call(d3.axisBottom(xScale).tickFormat((d) => daysOfWeek[+d]))
			.selectAll('text')
			.style('text-anchor', 'middle')
			.attr('dy', '0.5rem');

		// Y-axis
		g.append('g')
			.call(
				d3.axisLeft(yScale).tickFormat((id) => {
					const artistName = artistIdToName.get(+id);
					return artistName ? artistName : id;
				})
			)
			.selectAll('text')
			.style('text-anchor', 'middle')
			.attr('dx', '-1.25rem')
			.attr('dy', '0.2rem');

		// X-axis Label
		svg
			.append('text')
			.attr('x', containerWidth / 2)
			.attr('y', containerHeight - margin.top / 2)
			.style('text-anchor', 'middle')
			.style('font-size', '1rem')
			.text('Day of the Week');

		// Y-axis Label
		svg
			.append('text')
			.attr('x', -height / 2)
			.attr('y', margin.left / 2 - margin.right)
			.attr('transform', 'rotate(-90)')
			.style('text-anchor', 'middle')
			.style('font-size', '1rem')
			.text('Artist');
	});
</script>

<div id="heatmap-by-day-container" class="mx-auto w-full max-w-[1440px] rounded-lg bg-white p-8">
	<h1 class="text-center text-2xl font-bold">Artist Engagement by Day of Week</h1>
</div>
