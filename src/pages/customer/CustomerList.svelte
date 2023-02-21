<script lang="ts">
    import {onMount} from "svelte";
    import InfiniteScroll from "../../components/InfiniteScroll.svelte";
    import Loading from "../../components/Loading.svelte";
    import {Customers} from "../../lib/services";
    import type {ICustomer, ListResponse} from "../../lib/model";
    import {DataSource} from "../../lib/data_source";
    import CustomerCard from "./CustomerCard.svelte";

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
    <div class="customer-header-container">
        <div class="label">Id</div>
        <div class="label">Name</div>
        <div class="label">Email</div>
        <div class="label">Phone</div>
        <div class="label">&nbsp;</div>
    </div>
    <div class="customer-list-container">
        {#each customers as customer (customer.id)}
            <CustomerCard customer={customer}/>
        {/each}
    </div>

    <InfiniteScroll hasMore={customer_data_source.getHasMore()} on:loadMore={fetchData} threshold={60}/>
</div>

<style lang="scss">
  @import "src/assets/constants";

  .customer-list-wrapper {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-height: 100vh;

    padding: 1rem .75rem;

    background-color: $white;

    .customer-list-container {
      width: 80%;
      height: 100%;
      overflow-y: scroll;
      padding: 2em 4em 0 4em;
    }

    .customer-header-container {
      display: table;
      width: 80%;
      padding: 0 4em;

      .label {
        display: table-cell;
        width: 24rem;
      }
    }
  }
</style>