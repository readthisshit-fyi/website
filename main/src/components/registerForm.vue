<script setup lang="ts">
import { m } from "../paraglide/messages";
import { ref } from "vue";
import { authClient } from "./lib/auth-client";
import { toast } from "@oscarrc/crust/vanilla";

const userEmail = ref("");
const userPassword = ref("");
const userName = ref("");

function registerUser() {
  authClient.signUp.email(
    {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    },
    {
      onSuccess() {
        toast.info(m.registration_successful());
        window.location.href = "/user/login";
      },
      onError() {
        toast.error(m.registration_error());
      },
    },
  );
}
</script>

<template>
  <div class="form">
    <div class="inputField">
      <label for="userName">{{ m.nickname() }}</label>
      <input type="text" :placeholder="m.nickname_placeholder()" name="userName" id="userName" v-model="userName" />
    </div>
    <div class="inputField">
      <label for="userEmail">{{ m.email() }}</label>
      <input type="email" :placeholder="m.email_placeholder()" name="userEmail" id="userEmail" v-model="userEmail" />
    </div>
    <div class="inputField">
      <label for="userPassword">{{ m.password() }}</label>
      <input type="password" :placeholder="m.password_placeholder()" name="userPassword" id="userPassword" v-model="userPassword" />
    </div>
    <p class="acceptance">
      {{ m.acceptance_first_part() }} <a href="/legal/terms">{{ m.terms_of_service() }}</a> {{ m.acceptance_and() }}
      <a href="/legal/privacy">{{ m.privacy_policy() }}</a>
    </p>
    <button @click="registerUser">{{ m.registration_button() }}</button>
  </div>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 50%;

  .inputField {
    display: flex;
    flex-direction: column;

    input,
    textarea {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--background);
      border: var(--text) 2px solid;
      padding: 6px;
      border-radius: 4px;
      color: var(--text);
      resize: none;
    }
  }

  button {
    width: auto;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    gap: 2px;
    font-weight: 500;
    font-size: 16px;
    background: var(--background);
    border: var(--text) 2px solid;
    padding: 6px 12px;
    border-radius: 4px;
    color: var(--text);
    transition: all 0.2s ease;
    margin-top: 12px;

    &:hover {
      background: var(--text);
      color: var(--background);
      transition: all 0.1s ease;
    }
  }

  .acceptance {
    color: var(--dimmed-text-two);
    font-size: 16px;

    a {
      color: var(--text);
      text-decoration: underline;

      &:visited {
        color: var(--dimmed-text-two);
      }
    }
  }
}
</style>
