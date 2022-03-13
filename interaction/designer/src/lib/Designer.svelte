<script lang="ts">
    import Appbar from "./components/Appbar.svelte";
    import Canvas from "./components/Canvas.svelte";
    import {addItem} from "./scripts/Canvas";
    import {draggable} from "./scripts/Draggable";
</script>

<Appbar/>

<Canvas/>



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
</style>