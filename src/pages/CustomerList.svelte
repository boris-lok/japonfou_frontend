<script lang="ts">
    import {onMount} from "svelte";
    import InfiniteScroll from "../components/InfiniteScroll.svelte";
    import Loading from "../components/Loading.svelte";
    import {Customers} from "../lib/services";
    import type {ICustomer, ListResponse} from "../lib/model";
    import {DataSource} from "../lib/data_source";

    let customers: ICustomer[] = [];
    let loading: boolean = false;
    let keyword: object = {};

    const f = async (page: number, page_size: number): Promise<ListResponse<ICustomer>> =>
        await Customers.get_customers(keyword, page, page_size);


    let customer_data_source = new DataSource<ICustomer>([], 0, 30, f);

    const fetchData = async () => {
        loading = true;
        await customer_data_source.next();
        customers = [...customer_data_source.data];
        loading = false;
    }

    onMount(async () => {
        await fetchData();
    });
</script>

<div class="customer-list-wrapper">
    {#if loading}
        <Loading/>
    {/if}
    {#each customers as customer (customer.id)}
        <div class="customer-wrapper">
            <div>{ customer.id }</div>
            <div>{ customer.name }</div>
        </div>
    {/each}
    <InfiniteScroll hasMore={customer_data_source.getHasMore()} on:loadMore={fetchData} threshold={60}/>
</div>

<style lang="scss">
  .customer-list-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: 100%;
    max-height: 10vh;
    overflow-y: scroll;
    position: relative;
    padding: 1rem .75rem;
  }
</style>