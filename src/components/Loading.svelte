<script lang="ts">
    export let color = "#ff8800";
    export let unit = "px";

    export let duration = "0.75s";
    export let size = "60";
</script>

<div class="loading-wrapper" style="--size: {size}{unit};">
    <div class="circle" style="--size: {size}{unit}; --color: {color}; --duration: {duration}"></div>
</div>

<style lang="scss">
  .loading-wrapper {
    position: fixed;
    top: calc(50% - (var(--size) / 2));
    left: calc(50% - (var(--size) / 2));
    z-index: 1;
  }

  .circle {
    height: var(--size);
    width: var(--size);
    border-color: var(--color) transparent var(--color) var(--color);
    border-width: calc(var(--size) / 15);
    border-style: solid;
    border-image: initial;
    border-radius: 50%;
    animation: var(--duration) linear 0s infinite normal none running rotate;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>