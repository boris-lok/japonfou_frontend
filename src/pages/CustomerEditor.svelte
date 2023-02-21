<script lang="ts">
    import type {ICreateCustomerRequest} from "../lib/model";
    import InputBox from "../components/InputBox.svelte";
    import {EInputBox} from "../lib/model.js";
    import {validateEmail, validatePhone} from "../utils";
    import {Customers} from "../lib/services";
    import type {AxiosError} from "axios";

    let default_customer = {
        name: '',
    };

    let customer: ICreateCustomerRequest = default_customer;
    let error_msg: string | null = null;
    let is_name_error: boolean = false;
    let is_email_error: boolean = false;
    let is_phone_error: boolean = false;
    let email_ref;
    let phone_ref;

    const onNameChanged = e => changeCustomer("name", e.target.value);
    const onEmailChanged = e => changeCustomer("email", e.target.value);

    const onPhoneChanged = e => changeCustomer("phone", e.target.value);
    const onRemarkChanged = e => changeCustomer("remark", e.target.value);

    const changeCustomer = (k: string, v: string) => customer = {
        ...customer,
        [k]: v
    };

    const onNameBlur = () => is_name_error = !checkName();

    const checkName = (): boolean => {
        let name = customer.name;
        return name.trim().length !== 0;
    }

    const onEmailOrPhoneBlur = () => {
        is_email_error = !checkEmail();
        is_phone_error = !checkPhone();
    }

    const checkEmail = (): boolean => {
        let email = customer.email ?? '';
        return email.trim().length === 0 || (email.trim().length > 0 && validateEmail(email));
    }

    const checkPhone = (): boolean => {
        let phone = customer.phone ?? '';
        return phone.trim().length === 0 || (phone.trim().length > 0 && validatePhone(phone));
    }

    const handleCreation = async () => {
        checkName();
        checkEmail();
        checkPhone();

        if (is_name_error || is_email_error || is_phone_error) {
            return
        }

        try {
            let _ = await Customers.create_customer(customer);
            customer = {
                ...default_customer,
                name: customer.name
            };
            email_ref.reset();
            phone_ref.reset();
        } catch (e: AxiosError) {
            error_msg = e.response?.data?.error_message;
        }
    }
</script>

<main>
    <div class="editor-wrapper">
        <div class="editor-container">
            <div class="title">Customer Editor</div>
            {#if error_msg !== null}
                <div class="error">{ error_msg }</div>
            {/if}
            <InputBox has_error={is_name_error} label="customer name" name="customer_name" on:blur={onNameBlur}
                      on:input={onNameChanged} type={EInputBox.text}/>
            <InputBox bind:this={email_ref} has_error={is_email_error} label="customer email"
                      name="customer_email"
                      on:blur={onEmailOrPhoneBlur} on:input={onEmailChanged} type={EInputBox.text}/>
            <InputBox has_error={is_phone_error} hint="ex: 12345678 or (853) 12345678" label="customer phone"
                      name="customer_phone"
                      on:blur={onEmailOrPhoneBlur} on:input={onPhoneChanged}
                      ref={phone_ref} type={EInputBox.text}/>
            <InputBox has_error={false} label="remark" name="remark" on:input={onRemarkChanged}
                      type={EInputBox.text}/>
            <div class="btn-container">
                <button on:click={handleCreation} type="button">Submit</button>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
  @import "src/assets/constants";

  .editor-wrapper {
    width: 100%;
    height: 100vh;
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: $white;

    .title {
      font-size: 1.25em;
      font-weight: 700;
      margin: 0.75rem 0;
      width: 100%;
      text-align: center;
    }

    .editor-container {
      width: 80%;
      max-width: 36rem;
      height: 100%;
      max-height: 32rem;
      background-color: $pure-white;
      border-radius: 10px;
      padding: 1rem 2rem;
      box-shadow: 0 0 10px 0 $grey-shadow;
      overflow-y: scroll;
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
  }
</style>