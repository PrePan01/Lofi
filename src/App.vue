<template>
  <Player></Player>
</template>

<script>
import Player from "./components/Player.vue";
export default {
  name: 'App',
  components: {Player}
}

</script>

<style>
body, html{
  margin: 0;
}
img{
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>
 