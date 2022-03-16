<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { isShowProperties, Properties, update_node} from "../scripts/Properties";
    import Textfield from "@smui/textfield";

    let showProperties = false;
    let properties = [];

    let value = '';

    isShowProperties.subscribe((value) => {
        showProperties = value;
    });

    Properties.subscribe((value) => {
        properties = value;
    });

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
    event = event as KeyboardEvent;
    if (event.key === 'Enter') {
      update_node([]); //todo 此处应该更新节点
    }
  }
</script>

<div class="Properties">
    {#if showProperties}
        <div class="mdc-elevation--z4 child" transition:slide|local>
            {#each properties as property}
                <div class="property">
                    <Textfield
                        class="shaped-outlined"
                        variant="outlined"
                        bind:value={value}
                        on:keydown={handleKeyDown}
                        label="Label"
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    @import "./Properties";

    .child {
        margin: 3px;
        padding: 3px;
        background: rgb(245, 213, 213);
    }
</style>
