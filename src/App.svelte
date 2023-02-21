<script lang="ts">
    import {Route, Router} from "svelte-navigator";
    import Login from "./pages/Login.svelte";
    import PrivateRoute from "./components/PrivateRoute.svelte";
    import {user} from "./stores/user";
    import AdminLayout from "./components/layout/AdminLayout.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import Logout from "./pages/Logout.svelte";
    import CustomerList from "./pages/CustomerList.svelte";
    import CustomerEditor from "./pages/CustomerEditor.svelte";

    user.useLocalStorage();
</script>

<Router>
    <Route path="login">
        <Login/>
    </Route>

    <PrivateRoute let:location path="dashboard">
        <AdminLayout>
            <Dashboard/>
        </AdminLayout>
    </PrivateRoute>

    <PrivateRoute let:location path="logout">
        <Logout/>
    </PrivateRoute>

    <PrivateRoute let:location path="customer/list">
        <AdminLayout>
            <CustomerList/>
        </AdminLayout>
    </PrivateRoute>

    <PrivateRoute let:location path="customer/create">
        <AdminLayout>
            <CustomerEditor/>
        </AdminLayout>
    </PrivateRoute>
</Router>