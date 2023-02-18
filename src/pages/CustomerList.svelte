<script lang="ts">

    import {onMount} from "svelte";
    import InfiniteScroll from "../components/InfiniteScroll.svelte";

    interface Customer {
        id: number,
        name: string
    }

    let page = 0;
    const page_size = 30;
    let customers: Customer[] = [];
    let loading: boolean = false;
    let hasMore: boolean = true;

    let i = 0;
    const fetch_data = async () => {
        console.log('fetch data');
        loading = true;
        let new_customers = Array.from(Array(page_size).keys()).map(x => {
            return {
                id: x + i,
                name: "boris"
            } as Customer
        });
        loading = false;
        i = (page + 1) * page_size + 1;
        hasMore = true;
        customers = [...customers, ...new_customers];
    }

    const reset = () => {
        page = 0;
        customers = [];
    }

    onMount(async () => {
        await fetch_data();
    });
</script>

<div class="customer-list-wrapper">
    {#if loading}
        <div> loading ...</div>
    {/if}
    {#each customers as customer (customer.id)}
        <div class="customer-wrapper">
            <div>{ customer.id }</div>
            <div>{ customer.name }</div>
        </div>
    {/each}
    <InfiniteScroll hasMore={hasMore} on:loadMore={() => {
        ++page;
        fetch_data();
    }} threshold={100}/>
</div>

<style lang="scss">
  .customer-list-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    max-height: 80vh;
    overflow-y: scroll;
    position: relative;
    padding: 1rem .75rem;
  }
</style>