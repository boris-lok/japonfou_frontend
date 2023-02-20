<script lang="ts">
    import {useLocation, useNavigate} from "svelte-navigator";
    import {user} from "../stores/user";
    import {Users} from "../lib/services";
    import type {AxiosError} from "axios";

    const navigate = useNavigate();
    const location = useLocation();

    let username: string = "";
    let password: string = "";
    let error_msg: string | null = null;

    const DASHBOARD = "/dashboard"

    // If user has already logged in, we bring user to dashboard page.
    $: if ($user) {
        navigate(DASHBOARD, {replace: true});
    }

    const handle_login = async () => {
        error_msg = null;
        try {
            let res = await Users.login(username, password);
            user.set(JSON.stringify({
                username: username,
                token: res.token
            }));
            const from = ($location.state && $location.state.from) || DASHBOARD;
            navigate(from, {replace: true});
        } catch (e: AxiosError) {
            if (e.response && e.response.status === 401) {
                error_msg = "Username or password is wrong"
            } else {
                error_msg = "Server unavailable"
            }
        }
    }
</script>

<div class="login-wrapper">
    <div class="login-container">
        <div class="label">Login</div>
        {#if error_msg !== null}
            <div class="error">{ error_msg }</div>
        {/if}
        <div class="input-container">
            <input bind:value={username} class:error={error_msg !== null} name="username" placeholder=" " required
                   type="text">
            <span>Username</span>
        </div>
        <div class="input-container">
            <input bind:value={password} class="input" class:error={error_msg !== null} name="password" placeholder=" "
                   required type="password">
            <span>Password</span>
        </div>
        <div class="btn-container">
            <button on:click={handle_login} type="submit">Login</button>
        </div>
    </div>
</div>


<style lang="scss">
  @import "src/assets/constants";

  .login-wrapper {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
  }

  .login-container {
    width: 90%;
    max-width: 24rem;
    height: 20rem;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    box-shadow: 0 0 24px 0 $grey-shadow;

    border-radius: .5rem;

    padding: 0 .75rem;

    > .label {
      font-size: 1.25em;
      font-weight: 700;
      margin: 0.75rem 0;
      width: 100%;
      text-align: center;
    }

    > form {
      width: 100%;
      padding: 1rem 0.75rem;
    }
  }

  .input-container {
    position: relative;
    width: 100%;

    margin: 1em 0;

    > input {
      width: 100%;
      border: 1px solid $black;
      padding: 10px;
      border-radius: 5px;
      outline: none;
      font-size: 1em;
    }

    > span {
      position: absolute;
      left: 0;
      padding: 10px;
      pointer-events: none;
      font-size: 1em;
      text-transform: uppercase;
      transition: 0.3s;
    }

    > input:focus ~ span, input:not(:placeholder-shown) ~ span {
      color: $deep-blue;
      transform: translateX(10px) translateY(-10px);
      font-size: 0.65em;
      padding: 0 10px;
      background-color: rgb(255, 255, 255);
    }

    > input:focus {
      border: 1px solid $deep-blue;
    }

    > input.error {
      border: 1px solid $error;
    }
  }

  .btn-container {
    width: 100%;

    text-align: center;

    > button {
      width: 120px;
      height: 36px;
      color: $black;
      font-size: 1em;
      cursor: pointer;
      border: 1px solid $black;
      border-radius: 5px;
      background-color: $light-blue;
    }
  }

  div.error {
    font-size: 1em;
    font-weight: 500;
    color: $error;
  }
</style>