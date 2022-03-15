<script lang="ts">
    import {Rect} from "../scripts/Components";
    import {draggable, toogleGrid} from "../scripts/Draggable";
    import {itemList, addItem} from "../scripts/Canvas";

    let grid: boolean = false;

    function add_rect() {
        let rect1 = new Rect(0, 0, 100, 100);
        console.log(rect1);
        addItem(rect1);
    }

    function use_grid() {
        toogleGrid();
        grid = !grid;
    }
</script>

<div class="Appbar">
    <h1>Components</h1>

    <button on:click={add_rect}>
        add Rect
    </button>
    <button on:click={use_grid}>
        {grid ? "Disable Grid" : "Enable Grid"}
    </button>
</div>

<style>
    .Appbar{
        border: 1px solid red;
        padding: 5px;
    }
</style>

