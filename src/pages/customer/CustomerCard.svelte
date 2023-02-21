<script lang="ts">
    import type {ICustomer} from "../../lib/model";

    export let customer: ICustomer;
</script>

<main>
    <div class="customer-card-wrapper">
        <div>{ customer.id} </div>
        <div>{ customer.name }</div>
        <div>{ customer.email !== null ? customer.email : ' ' }</div>
        <div>{ customer.phone !== null ? customer.phone : ' ' }</div>
    </div>
</main>
