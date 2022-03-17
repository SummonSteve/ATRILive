<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import {
        isShowProperties,
        Properties,
        update_node,
    } from "../scripts/Properties";
    import Textfield from "@smui/textfield";
    import { spring } from "svelte/motion";

    import List, {
        Item,
        Text,
        Graphic,
        Separator,
        Subheader,
    } from "@smui/list";

    import { Content } from "@smui/drawer";

    let propertiesOffsetY = 0;
    let showProperties = false;
    let properties = [];

    let value = "";

    isShowProperties.subscribe((value) => {
        showProperties = value;
    });

    Properties.subscribe((value) => {
        properties = value;
    });

    function handleKeyDown(event: CustomEvent | KeyboardEvent) {
        event = event as KeyboardEvent;
        if (event.key === "Enter") {
            update_node([]); //todo 此处应该更新节点
        }
    }
</script>

{#if showProperties}
    <Content>
        <List style="padding: 0px">
            {#each properties as property}
                <div transition:slide>
                    <Item class="textfield" style="padding: 17px">
                        <Textfield
                            variant="outlined"
                            label="{property.name}"
                            value="{property.value}"
                            onKeyDown={handleKeyDown}
                        />
                    </Item>
                </div>
            {/each}
        </List>
    </Content>
{/if}

<style>

</style>
