<script lang="ts">
    import {Route, Router} from "svelte-navigator";
    import Login from "./pages/Login.svelte";
    import PrivateRoute from "./components/PrivateRoute.svelte";
    import {user} from "./stores/user";

    user.useLocalStorage();
</script>

<Router>
    <Route path="login">
        <Login/>
    </Route>

    <PrivateRoute let:location path="dashboard">
        <h3>Welcome {$user}</h3>
    </PrivateRoute>
</Router>