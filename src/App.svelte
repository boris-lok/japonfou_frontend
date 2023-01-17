<script lang="ts">
    import AdminLayout from "./lib/layout/AdminLayout.svelte";
    import {Route, Router} from "svelte-routing";
    import Home from "./lib/Home.svelte";
    import Dashboard from "./lib/Dashboard.svelte";
</script>

<Router>
    <AdminLayout>
        <span slot="main-content">
            <Route path="/"><Home/></Route>
            <Route path="/dashboard"><Dashboard/></Route>
        </span>
    </AdminLayout>
</Router>
