<script setup lang="ts">
import { ref } from "vue";
import { authClient } from "./lib/auth-client";
import { toast } from "@oscarrc/crust/vanilla";
import { m } from "../paraglide/messages";

enum modes {
  magicLink = "magicLink",
  password = "password",
}

const mode = ref(modes.magicLink);
const userEmail = ref("");
const userPassword = ref("");

function login() {
  if (mode.value === modes.magicLink) {
    authClient.signIn.magicLink(
      {
        email: userEmail.value,
      },
      {
        onSuccess() {
          toast.info(m.magiclink_sent());
          window.location.href = "/";
        },
      },
    );
  } else if (mode.value === modes.password) {
    authClient.signIn.email(
      {
        email: userEmail.value,
        password: userPassword.value,
        rememberMe: true,
      },
      {
        onSuccess() {
          toast.info(m.login_successful());
          window.location.href = "/";
        },
        onError() {
          toast.error(m.login_failed());
        },
      },
    );
  }
}
</script>

<template>
  <div class="loginForm" v-if="mode == modes.magicLink">
    <div class="inputField">
      <label for="magicLinkEmail">{{ m.email() }}</label>
      <input type="email" :placeholder="m.email_placeholder()" name="magicLinkEmail" id="magicLinkEmail" v-model="userEmail" />
    </div>
    <div class="buttons">
      <button @click="login">{{ m.login_magiclink_button() }}</button>
      <button @click="mode = modes.password" class="altSignin">{{ m.login_with_password() }}</button>
    </div>
  </div>
  <div class="loginForm" v-if="mode == modes.password">
    <div class="inputField">
      <label for="magicLinkEmail">{{ m.email() }}</label>
      <input type="email" :placeholder="m.email_placeholder()" name="magicLinkEmail" id="magicLinkEmail" v-model="userEmail" />
    </div>
    <div class="inputField">
      <label for="password">{{ m.password() }}</label>
      <input type="password" :placeholder="m.password_placeholder()" name="password" id="password" v-model="userPassword" />
    </div>
    <div class="buttons">
      <button @click="login">{{ m.login_password_button() }}</button>
      <button @click="mode = modes.magicLink" class="altSignin">{{ m.login_with_magiclink() }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 50%;
  justify-self: start;

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

  .buttons {
    display: flex;
    gap: 8px;
    flex-direction: row;

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

      &:hover {
        background: var(--text);
        color: var(--background);
        transition: all 0.1s ease;
      }
    }

    .altSignin {
      border: var(--dimmed-text) 2px solid;
      color: var(--dimmed-text);

      &:hover {
        border: var(--text) 2px solid;
      }
    }
  }
}
</style>
