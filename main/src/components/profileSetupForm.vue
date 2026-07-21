<script setup>
import { ref } from "vue";
import { authClient } from "./lib/auth-client";
import { toast } from "@oscarrc/crust/vanilla";
import { m } from "../paraglide/messages";

const userNickname = ref("");

async function submitChanges() {
  if (userNickname.value.trim() === "") {
    toast.error(m.empty_nickname());
    return;
  }

  await authClient.updateUser(
    {
      name: userNickname.value.trim(),
    },
    {
      onRequest() {
        toast.loading(m.saving_nickname());
      },
      onSuccess() {
        toast.info(m.nickname_saved());
        window.location.href = "/";
      },
      onError() {
        toast.error(m.nickname_save_failed_title(), { message: m.nickname_save_failed() });
      },
    },
  );
}
</script>

<template>
  <div class="form">
    <div class="field">
      <label for="nicknameInputField">{{ m.nickname() }}</label>
      <input type="text" id="nicknameInputField" v-model="userNickname" placeholder="Your nickname" />
    </div>
    <button @click="submitChanges()">{{ m.apply_changes() }}</button>
  </div>
</template>

<style lang="scss" scoped>
.form {
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .field {
    display: flex;
    flex-direction: column;
    gap: 2px;

    input {
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
    align-self: center;
    gap: 2px;
    font-weight: 400;
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
