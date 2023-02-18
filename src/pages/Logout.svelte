<script lang="ts">
    import {user} from "../stores/user";
    import {onMount} from "svelte";
    import {useNavigate} from "svelte-navigator";

    const navigate = useNavigate();

    const clear_storage = () => {
        user.remove();
    }

    onMount(() => {
        clear_storage();
        navigate("/login", {replace: true});
    })
</script>
