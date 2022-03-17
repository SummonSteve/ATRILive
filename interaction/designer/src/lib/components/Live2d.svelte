<script lang="ts">
    // @ts-nocheck
    import { Live2DModel } from "pixi-live2d-display/lib/cubism4";
    import * as PIXI from "pixi.js";
    import { Ticker, TickerPlugin } from "@pixi/ticker";
    import { Application } from "@pixi/app";
    import { onMount } from "svelte";

    const cubism4Model =
        "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json";

    Live2DModel.registerTicker(Ticker);

    onMount(async () => {
        const app = new PIXI.Application({
            view: document.getElementById("canvas"),
            autoStart: true,
            resizeTo: window,
            transparent: true,
        });
        const model4 = await Live2DModel.from(cubism4Model);
        app.stage.addChild(model4);
        model4.scale.set(0.25);
        model4.x = 300;
    });
</script>

<canvas id="canvas" />
