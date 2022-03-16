<script lang="ts">
	import {mouseEvent, itemList} from "../scripts/Canvas";
	import {draggable} from "../scripts/Draggable";
	import {resize} from "../scripts/Resizable";
	import {select} from "../scripts/Selectable";

	function get_scale(){
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

	function handleWheel(e) {
		let scale_size = (e.shiftKey ? 0.2 : 1) * e.deltaY;
		scale -= (scale > 0.3 || scale_size < 0) ? scale_size/1500 : 0;
		x = (-e.offsetX + 480) * scale;
		y = (-e.offsetY + 270) * scale;
		x = (e.shiftKey ? 0.2 : 1) * (e.deltaY > 0 ? -1 : 1) * (Math.abs(lastx - x) < 50 ? x : lastx - x > 0 ? -20 * (1/scale) : 20 * (1/scale));
		y = (e.shiftKey ? 0.2 : 1) * (e.deltaY > 0 ? -1 : 1) * (Math.abs(lasty - y) < 50 ? y : lasty - y > 0 ? -20 * (1/scale) : 20 * (1/scale));

		lastx = x;
		lasty = y;
		posX += x;
		posY += y;
		
		grid_size = scale > 1.3 ? 20 : 0;

}
</script>

<svelte:window on:wheel|preventDefault|nonpassive = {handleWheel}/>

<div id="root" class="Canvas" use:mouseEvent={is_placing} style="transform: scale({scale}) translate({posX}px,{posY}px); background-size: {grid_size}px {grid_size}px;">
    {#each $itemList as item}
		<div id="{item.id}-handle" use:resize={get_scale} use:select style="transform: translate({item.x}px,{item.y}px); width: {item.width + 4}px; height: {item.height + 4}px; position: absolute;">
			<div id="{item.id}" use:draggable={get_scale} style="{item.style}}"></div>
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
