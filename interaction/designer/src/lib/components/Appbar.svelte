<script lang="ts">
    let project_name = "Hello AtriLive";

    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import Select, { Option } from '@smui/select';
    import Icon from '@smui/select/icon';
    import IconButton from '@smui/icon-button';
    import Checkbox from '@smui/checkbox';
    import {Rect} from "../scripts/Components";
    import {draggable, toogleGrid} from "../scripts/Draggable";
    import {itemList, addItem} from "../scripts/Canvas";

    let ComponentsAvailable = ['Rect', 'Text', 'Ellipse', 'Line', 'Image'];

    let grid: boolean = false;

    function add_rect() {
        let rect1 = new Rect(0, 0, 100, 100);
        addItem(rect1);
    }

    function use_grid() {
        toogleGrid();
        grid = !grid;
    }
</script>

<div class="Appbar">
    <TopAppBar variant="static">
        <Row>
            <Section align="end">
                <Title>{project_name}</Title>
            </Section>
            <Section>
                <Select label="Add Component" variant="filled">
                    {#each ComponentsAvailable as item}
                      <Option value={item} on:click={add_rect}>{item}</Option>
                    {/each}
                </Select>
            </Section>
        </Row>


    </TopAppBar>
</div>

<style>
</style>

