<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../stores/user";

    const navigate = useNavigate();
    const location = useLocation();

    console.log(`${$user}`);

    $: if (!$user) {
        navigate("/login", {
            state: { from: $location.pathname },
            replace: true,
        });
    }
</script>

{#if $user}
    <slot />
{/if}
