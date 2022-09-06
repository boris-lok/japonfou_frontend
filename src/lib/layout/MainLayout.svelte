<script lang="ts">
    import Sidebar from "../sidebar/Sidebar.svelte";

    export let showSidebar = true;
</script>

<Sidebar show="{showSidebar}" />