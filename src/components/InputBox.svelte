<script lang="ts">
  import { EInputBox } from "../lib/model";

  export let value: string = "";
  export let has_error: boolean = false;
  export let name: string = "";
  export let type: EInputBox = EInputBox.text;
  export let label: string = "";

  export let hint: string | null = null;

  export const reset = () => (ref.value = "");

  let ref: HTMLInputElement;

  const type_action = (node: HTMLInputElement) => {
    node.type = type;
  };
</script>

<div class="input-box-container">
  <input
    bind:this={ref}
    class:error={has_error}
    {name}
    on:blur
    on:input
    on:keypress
    placeholder=" "
    type="text"
    use:type_action
    {value}
  />
  <span>{label}</span>
  {#if hint !== null}
    <div class="hint">{hint}</div>
  {/if}
</div>

<style lang="scss">
  @import "src/assets/constants";

  .input-box-container {
    position: relative;
    width: 100%;
    margin: 1em 0;

    > input {
      width: 100%;
      border: 1px solid $black;
      padding: 10px 16px;
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

    > input:focus ~ span,
    input:not(:placeholder-shown) ~ span {
      color: $deep-blue;
      transform: translateX(10px) translateY(-12px);
      font-size: 0.65em;
      padding: 0 16px;
      background-color: $pure-white;
      border-radius: 5px;
    }

    > input:focus {
      border: 1px solid $deep-blue;
    }

    > input.error {
      border: 1px solid $error;
    }

    .hint {
      font-size: 13px;
      color: $deep-blue;
      font-weight: 700;
      padding: 0 1em;
      margin: 0.25em 0 0 0;
    }
  }
</style>
