<script lang="ts">
    import Hamburger from "./Hamburger.svelte";

    export let sidebar = false;
</script>

<header>
    <nav>
        <div class="nav-wrapper">
            <Hamburger />
        </div>
    </nav>
</header>


<style>
    .nav-wrapper {
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: rgb(225, 225, 234);
    }
</style>