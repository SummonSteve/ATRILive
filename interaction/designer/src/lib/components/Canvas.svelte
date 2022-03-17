<script lang="ts">
	import { mouseEvent } from "../scripts/Canvas";
	import { draggable } from "../scripts/Draggable";
	import { resize } from "../scripts/Resizable";
	import { select, clearSelect } from "../scripts/Selectable";
	import { addComponent, ComponentsList } from "../scripts/Global";
import Live2d from "./Live2d.svelte";

	function get_scale() {
		return scale;
	}

	let is_placing = false;
	let scale = 1;
	let lastx = 0;
	let lasty = 0;
	let x = 0;
	let y = 0;
	let posX = 0;
	let posY = 0;
	let grid_size = 0;

	function handleClick(e: MouseEvent) {
		let target = e.target as HTMLElement;
		if (target.id === "root") clearSelect();
	}

	function handleWheel(e: WheelEvent) {
		let target = e.target as HTMLElement;
		if (target.id === "") return;
		e.preventDefault();
		let scale_size = (e.shiftKey ? 0.2 : 1) * e.deltaY;
		scale -= scale > 0.3 || scale_size < 0 ? scale_size / 1500 : 0;
		x = (-e.offsetX + 480) * scale;
		y = (-e.offsetY + 270) * scale;
		x =
			(e.shiftKey ? 0.2 : 1) *
			(e.deltaY > 0 ? -1 : 1) *
			(Math.abs(lastx - x) < 50
				? x
				: lastx - x > 0
				? -20 * (1 / scale)
				: 20 * (1 / scale));
		y =
			(e.shiftKey ? 0.2 : 1) *
			(e.deltaY > 0 ? -1 : 1) *
			(Math.abs(lasty - y) < 50
				? y
				: lasty - y > 0
				? -20 * (1 / scale)
				: 20 * (1 / scale));

		lastx = x;
		lasty = y;
		posX += x;
		posY += y;

		grid_size = scale > 1.3 ? 20 : 0;
	}
	$: items = [];
	ComponentsList.subscribe((value) => {
		items = [];
		let i: string;
		for (i in value) {
			items = [...items, value[i]];
		}
	});
</script>

<svelte:window on:wheel|nonpassive={handleWheel} on:click={handleClick} />

<div
	id="root"
	class="Canvas"
	use:mouseEvent={is_placing}
	style="transform: scale({scale}) translate({posX}px,{posY}px); background-size: {grid_size}px {grid_size}px;"
>
	
	{#each items as item}
		<div
			id="{item.id}-handle"
			use:resize={get_scale}
			use:select
			style="transform: translate({item.obj.x}px,{item.obj
				.y}px); width: {item.obj.width + 4}px; height: {item.obj
				.height + 4}px; position: absolute;"
		>
			<div
				id={item.id}
				use:draggable={get_scale}
				style="{item.obj.style}}"
			/>
		</div>
	{/each}
</div>

<style>
	.Canvas {
		width: 960px;
		height: 540px;
		margin-left: 2px;
		border: 1px dashed rgb(0, 0, 0);
	}
	:global(.grabber) {
		position: absolute;
		box-sizing: border-box;
	}
	:global(.grabber.bottom-right) {
		height: 8px;
		width: 8px;
		background: black;
		bottom: -2px;
		right: -2px;
		cursor: se-resize;
		border-radius: 100%;
	}

	:global(.grabber.selected) {
		border: solid 1px black;
	}
</style>
