<script lang="ts">
    let project_name = "Hello AtriLive";

    import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
    import Select, { Option } from "@smui/select";
    import IconButton, { Icon } from "@smui/icon-button";
    import Checkbox from "@smui/checkbox";
    import { Rect } from "../scripts/Components";
    import { draggable, toggleGrid, toggleBoarder } from "../scripts/Draggable";
    import { itemList, addItem } from "../scripts/Canvas";
    import Drawer, { AppContent, Content } from "@smui/drawer";
    import { fade, fly } from "svelte/transition";
    import Properties from "../components/Properties.svelte";

    let dawerOpen = true;
    let settingsOpen = true;
    let gridOpen = true;
    let boarderOpen = true;

    function toggleSettings() {
        settingsOpen = !settingsOpen;
    }

    function toggleDrawer() {
        dawerOpen = !dawerOpen;
    }

    let ComponentsAvailable = [{ item: "Rect", f: add_rect }];

    function add_rect() {
        let rect1 = new Rect(0, 0, 100, 100);
        addItem(rect1);
    }
</script>

<div class="Appbar">
    <TopAppBar variant="static">
        <Row>
            <Section align="end">
                <Title>{project_name}</Title>
            </Section>
            <Section>
                <IconButton
                    on:click={toggleDrawer}
                    toggle
                    bind:pressed={dawerOpen}
                >
                    <Icon class="material-icons" on>menu_open</Icon>
                    <Icon class="material-icons">menu</Icon>
                </IconButton>
                <IconButton class="material-icons" on:click={toggleSettings}
                    >settings_applications</IconButton
                >
                {#if settingsOpen}
                    <p
                        in:fly={{ x: -10, duration: 200 }}
                        out:fly={{ x: -10, duration: 200 }}
                    >
                        <IconButton
                            class="material-icons"
                            on:click={toggleGrid}
                            toggle
                            bind:pressed={gridOpen}
                        >
                            <Icon class="material-icons" on>grid_off</Icon>
                            <Icon class="material-icons">grid_on</Icon>
                        </IconButton>
                    </p>
                    <p
                        in:fly={{ x: -40, duration: 200 }}
                        out:fly={{ x: -40, duration: 200 }}
                    >
                        <IconButton
                            class="material-icons"
                            on:click={toggleBoarder}
                            toggle
                            bind:pressed={boarderOpen}
                        >
                            <Icon class="material-icons" on>crop</Icon>
                            <Icon class="material-icons">deselect</Icon>
                        </IconButton>
                    </p>
                {/if}
            </Section>
            <Section />
        </Row>
    </TopAppBar>
</div>

<div class="drawer-container">
    <Drawer
        style="background-color: rgba(0, 0, 0, 0.1)"
        variant="dismissible"
        bind:open={dawerOpen}
    >
        <Select label="Add Component" variant="filled">
            {#each ComponentsAvailable as { item, f }}
                <Option value={item} on:click={f}>{item}</Option>
            {/each}
        </Select>
        <Properties />
    </Drawer>
</div>

<style>
    .drawer-container {
        position: absolute;
        height: 700px;
        width: 200px;
        top: 75px;
        left: 8px;
        right: 0;
        bottom: 0;
    }

    .Appbar {
        background-color: var(--mdc-theme-background, #fff);
    }
</style>
