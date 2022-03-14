<script lang="ts">
    import {Rect} from "../scripts/Components";
    import {draggable} from "../scripts/Draggable";
    import {itemList, addItem} from "../scripts/Canvas";

</script>

<div class="Appbar">
    <h1>Components</h1>

    <button on:click={addItem}>
        add Rect
    </button>
</div>

<style>
    .Appbar{
        border: 1px solid red;
        padding: 5px;
    }
</style>

