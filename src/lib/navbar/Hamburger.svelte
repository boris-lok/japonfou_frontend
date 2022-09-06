<script lang="ts">
    import Fa from 'svelte-fa/src/fa.svelte';
    import {faBars} from "@fortawesome/free-solid-svg-icons";
</script>

<div class="hamburger">
    <Fa icon={faBars}
        size="1.5x" />
</div>

<style>
    .hamburger {
        display: flex;
        width: 2rem;
        height: 2rem;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>

