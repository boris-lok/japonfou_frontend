<script>
    import Sidebar from "../sidebar/Sidebar.svelte";
</script>

<main class="main-wrapper">
    <Sidebar show={true}></Sidebar>
    <div class="content-wrapper">
        <slot />
    </div>
</main>

<style lang="scss">
  .main-wrapper {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100vh;

    > .content-wrapper {
      background-color: antiquewhite;
      width: 100%;
      height: 100vh;
    }
  }
</style>
