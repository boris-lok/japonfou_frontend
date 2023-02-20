<script lang="ts">
    import {EInputBox} from "../lib/model";

    export let value: string = ""
    export let has_error: boolean = false;
    export let name: string = "";
    export let type: EInputBox = EInputBox.text;

    export let label: string = "";

    const type_action = (node: HTMLInputElement) => {
        node.type = type;
    }
</script>

<div class="input-box-container">
    <input class:error={has_error} name={name} on:input on:keypress placeholder=" " type="text" use:type_action
           value={value}/>
    <span>{label}</span>
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
</style>