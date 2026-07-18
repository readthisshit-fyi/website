<script setup lang="ts">
import { ref } from "vue";
import { authClient } from "./lib/auth-client";
import { toast } from "@oscarrc/crust/vanilla";

enum modes {
  magicLink = "magicLink",
  password = "password",
}

const mode = ref(modes.magicLink);
const magicLinkEmail = ref("");

function loginViaMagicLink() {
  authClient.signIn.magicLink(
    {
      email: magicLinkEmail.value,
    },
    {
      onSuccess() {
        toast.info("Check your email!");
        window.location.href = "/";
      },
    },
  );
}
</script>

<template>
  <div class="magicLink-login">
    <div class="inputField">
      <label for="magicLinkEmail">Email</label>
      <input type="email" placeholder="email@example.org" name="magicLinkEmail" id="magicLinkEmail" v-model="magicLinkEmail" />
    </div>
    <button @click="loginViaMagicLink">Send magic link</button>
  </div>
</template>

<style lang="scss">
.magicLink-login {
  display: flex;
  flex-direction: column;
  gap: 16px;
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

    &:hover {
      background: var(--text);
      color: var(--background);
      transition: all 0.1s ease;
    }
  }
}
</style>
