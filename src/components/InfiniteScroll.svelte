<script lang="ts">
    import {createEventDispatcher, onDestroy} from "svelte";

    export let threshold: number = 50;
    export let horizontal: boolean = false;
    export let elementScroll;
    export let hasMore: boolean = false;

    const dispatch = createEventDispatcher();
    let loading: boolean = false;
    let component;

    const onScroll = e => {
        const element = e.target;

        const offset = horizontal ? element.scrollWidth - element.clientWidth - element.scrollLeft :
            element.scrollHeight - element.clientHeight - element.scrollTop;

        if (offset < threshold && !loading && hasMore) {
            loading = true;
            dispatch("loadMore");
        } else {
            loading = false;
        }
    };

    $: {
        if (component || elementScroll) {
            const element = elementScroll ? elementScroll : component.parentNode;

            element.addEventListener("scroll", onScroll);
            element.addEventListener("resize", onScroll);
        }
    }

    onDestroy(() => {
        if (component || elementScroll) {
            const element = elementScroll ? elementScroll : component.parentNode;

            element.addEventListener("scroll", null);
            element.addEventListener("resize", null);
        }
    })
</script>

<div bind:this={component}></div>