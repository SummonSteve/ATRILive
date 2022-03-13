<script lang="ts">
	import {handledrag, itemList} from "../scripts/Canvas";
	import {draggable} from "../scripts/Draggable";

	let scale = 1;
	let lastx = 0;
	let lasty = 0;
	let x = 0;
	let y = 0;
	let posX = 0;
	let posY = 0;
	function handleWheel(e) {
    console.log(e);
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
}
</script>

<svelte:window on:wheel|preventDefault|nonpassive = {handleWheel}/>

<div class="Canvas" style="transform: scale({scale}, {scale}) translate({posX}px,{posY}px);" use:handledrag>
    {#each itemList as item}
		<div class="item" use:draggable>
		</div>
	{/each}
</div>

<style>
	.item {
		height: 56px;
		width: 56px;
		position: relative;
		display: inline-block;
		background: rgba(255, 65, 65, 0.5);
		margin: 4px;
		box-shadow: 4px 4px 4px rgba(0,0,0,0.2);
	}
    .Canvas {
	width: 960px;
    height: 540px;
    
    float: left;
    padding: 15px;
    border: 1px solid red;
}
</style>