<script lang="ts">
    import {useLocation, useNavigate} from "svelte-navigator";
    import {user} from "../stores/user";

    const navigate = useNavigate();
    const location = useLocation();

    let username: string = "";
    let password: string = "";

    const handle_login = () => {
        // TODO: call api to login
        user.set(username);
        const from = ($location.state && $location.state.from) || "/";
        navigate(from, {replace: true});
    }
</script>

<h3>Login</h3>
<form on:submit={handle_login}>
    <input bind:value={username} name="username" placeholder="Username" type="text">
    <br/>
    <input bind:value={password} name="password" placeholder="Password" type="password">
    <br/>
    <button type="submit">Login</button>
</form>