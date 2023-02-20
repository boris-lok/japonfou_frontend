<script lang="ts">
    import {useLocation, useNavigate} from "svelte-navigator";
    import {user} from "../stores/user";
    import {Users} from "../lib/services";
    import type {AxiosError} from "axios";
    import InputBox from "../components/InputBox.svelte";
    import {EInputBox} from "../lib/model.js";

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

    const validate = (): boolean => {
        return username.trim() !== "" && password.trim() !== "";
    }

    const on_username_changed = (e: any) => username = e.target.value;

    const on_password_changed = (e: any) => password = e.target.value;

    const on_key_press = async e => {
        let key_code = e.code || e.key;
        if (key_code === "Enter") {
            await handle_login();
        }
    }

    const handle_login = async () => {
        error_msg = null;
        try {
            if (validate()) {
                let res = await Users.login(username, password);
                user.set(JSON.stringify({
                    username: username,
                    token: res.token
                }));
                const from = ($location.state && $location.state.from) || DASHBOARD;
                navigate(from, {replace: true});
            } else {
                error_msg = "Please fill the username and password";
            }
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
        <InputBox has_error={error_msg !== null} label="Username" name="username"
                  on:input={on_username_changed} on:keypress={on_key_press} type={EInputBox.text}/>
        <InputBox has_error={error_msg !== null} label="Password" name="password" on:input={on_password_changed}
                  on:keypress={on_key_press} type={EInputBox.password}/>
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