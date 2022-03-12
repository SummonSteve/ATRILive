<script lang="ts">
    let y = 1;
    function handleWheel(e) {
        y += e.deltaY/2000;
    }

    function handledrag(node) {
		 let moving = false;
		 let left = 300;
		 let top = 100;

		 node.style.position = 'absolute';
		 node.style.top = `${top}px`;
		 node.style.left = `${left}px`;
		 node.style.cursor = 'move';
		 node.style.userSelect = 'none';

		 node.addEventListener('mousedown', () => {
			 moving = true;
		 });
		 
		window.addEventListener('mousemove', (e) => {
			  if (moving) {
					 left += e.movementX;
					 top += e.movementY;
					 node.style.top = `${top}px`;
					 node.style.left = `${left}px`;
				}
		 });
		
		 window.addEventListener('mouseup', () => {
			 moving = false;
		 });
	
	}
</script>

<svelte:window on:wheel|preventDefault = {handleWheel}/>

<div class="Canvas" style="transform: scale({y}, {y});" use:handledrag>
    <h1>Canvas</h1>
</div>

<style>
    .Canvas {
    height: 360px;
    width: 640px;
    
    float: right;
    padding: 15px;
    border: 1px solid red;
}
</style>