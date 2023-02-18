<script lang="ts">

    import {onMount} from "svelte";

    export let query;

    let mql;
    let mql_listener;
    let is_mounted: boolean = false;
    let matches: boolean = false;

    const remove_active_listener = () => {
        if (mql && mql_listener) {
            // mql.removeListener(mql_listener);
            mql.removeEventListener(mql_listener);
        }
    }

    const add_new_listener = (query) => {
        // TODO: h
        mql = window.matchMedia(query);
        mql_listener = v => matches = v.matches;
        // mql.addListener(mql_listener);
        mql.addEventListener(mql_listener);
        matches = mql.matches;
    }

    onMount(() => {
        is_mounted = true;
        return () => remove_active_listener();
    });

    $: {
        if (is_mounted) {
            remove_active_listener();
            add_new_listener(query);
        }
    }

</script>

<slot {matches}/>