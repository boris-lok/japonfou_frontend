<script lang="ts">
  import { useLocation, useNavigate } from "svelte-navigator";
  import { user } from "../stores/user";
  import { Users } from "../lib/services";
  import { isAxiosError } from "axios";
  import InputBox from "../components/InputBox.svelte";
  import { EInputBox } from "../lib/model.js";
  import { finalize, from } from "rxjs";
  import { startWithTap } from "../lib/utils";

  const navigate = useNavigate();
  const location = useLocation();

  let username = "";
  let password = "";
  let errorMessage: string | null = null;
  let loading = false;

  const DASHBOARD = "/dashboard";

  // If user has already logged in, we bring user to dashboard page.
  $: if ($user) {
    navigate(DASHBOARD, { replace: true });
  }

  function validate() {
    return username.trim() !== "" && password.trim() !== "";
  }

  function onUserChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    username = target.value.trim();
  }

  function onPasswordChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    password = target.value.trim();
  }

  function onKeyPress(e: KeyboardEvent) {
    let key_code = e.code || e.key;
    if (key_code === "Enter") {
      loginHandler();
    }
  }

  function loginHandler() {
    errorMessage = null;
    if (validate() && !loading) {
      from(Users.login(username, password))
        .pipe(
          startWithTap(() => (loading = true)),
          finalize(() => (loading = false))
        )
        .subscribe({
          next: (resp) => {
            user.set(
              JSON.stringify({
                username: username,
                token: resp.token,
              })
            );

            const to = ($location.state && $location.state.from) || DASHBOARD;
            navigate(to, { replace: true });
          },
          error: (e) => {
            if (isAxiosError(e)) {
              if (e.response && e.response.status === 401) {
                errorMessage = "Username or password is wrong";
              } else {
                errorMessage = "Server unavailable";
              }
            } else {
              console.error(e);
              errorMessage = "unknow error";
            }
          },
        });
    } else {
      errorMessage = "Please fill the username and password";
    }
  }
</script>

<div class="login-wrapper">
  <div class="login-container">
    <div class="label">Login</div>
    {#if errorMessage !== null}
      <div class="error">{errorMessage}</div>
    {/if}
    <InputBox
      has_error={errorMessage !== null}
      label="Username"
      name="username"
      on:input={onUserChanged}
      on:keypress={onKeyPress}
      type={EInputBox.text}
    />
    <InputBox
      has_error={errorMessage !== null}
      label="Password"
      name="password"
      on:input={onPasswordChanged}
      on:keypress={onKeyPress}
      type={EInputBox.password}
    />
    <div class="btn-container">
      <button
        class={loading ? "disabled" : ""}
        on:click={loginHandler}
        type="submit"
        disabled={loading}>Login</button
      >
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

    border-radius: 0.5rem;

    padding: 0 0.75rem;

    > .label {
      font-size: 1.25em;
      font-weight: 700;
      margin: 0.75rem 0;
      width: 100%;
      text-align: center;
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
      background-color: $deep-blue;
    }

    > button.disabled {
      background-color: $light-grey;
    }
  }

  div.error {
    font-size: 1em;
    font-weight: 500;
    color: $error;
  }
</style>
