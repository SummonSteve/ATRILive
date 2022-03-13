<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Designer from './lib/Designer.svelte';
  //import Canvas from './lib/Components/Canvas.svelte';

  export let url = "";
</script>

<link rel="stylesheet" href="node_modules/svelte-material-ui/bare.css" />
<!-- Material Icons -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
<!-- Roboto -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
/>
<!-- Roboto Mono -->
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto+Mono"
/>

<Router url="{url}">
  <Route path="designer" component="{Designer}" />

</Router>

<style>

</style>
