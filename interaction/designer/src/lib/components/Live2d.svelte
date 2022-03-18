<script lang="ts">
    // @ts-nocheck
    import { Live2DModel } from "pixi-live2d-display/lib/cubism4";
    import * as PIXI from "pixi.js";
    import { Ticker } from "@pixi/ticker";
    import { onMount } from "svelte";
    import { Vector2d } from "../scripts/Live2d";
    import { ComponentsList } from "../scripts/Global";

    const cubism4Model =
        "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json";

    Live2DModel.registerTicker(Ticker);

    onMount(async () => {
        const app = new PIXI.Application({
            view: document.getElementById("canvas"),
            autoStart: true,
            height: 1000,
            width: 1000,
            transparent: true,
        });
        const model4 = await Live2DModel.from(cubism4Model);
        app.stage.addChild(model4);
        model4.scale.set(0.5);
    });
</script>

<canvas class="Live2dcanvas" id="canvas" />

<style>
    .Live2dcanvas { 
        width: 500px;
        height: 500px;
    }
</style>
