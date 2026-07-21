<script setup>
import { ref } from "vue";
import { authClient } from "./lib/auth-client";
import { toast } from "@oscarrc/crust/vanilla";
import { m } from "../paraglide/messages";

const userHasPassword = authClient;

const newUserNickname = ref("");
const newUserEmail = ref("");
const newUserPassword = ref("");
const oldUserPassword = ref("");

function clearFields() {
  newUserEmail.value = "";
  newUserNickname.value = "";
  newUserPassword.value = "";
  oldUserPassword.value = "";
}

async function saveUserSettings() {
  let loadingToast = toast.loading(m.saving_settings());

  if (newUserEmail.value !== "") {
    await authClient.changeEmail(
      {
        newEmail: newUserEmail.value,
      },
      {
        onSuccess() {
          toast.success(m.email_saved(), { message: m.check_inbox() });
        },
        onError() {
          toast.error(m.email_save_failed());
        },
      },
    );
  }

  if (oldUserPassword.value !== "" && newUserPassword.value !== "") {
    await authClient.changePassword(
      {
        newPassword: newUserPassword.value,
        currentPassword: oldUserPassword.value,
        revokeOtherSessions: true,
      },
      {
        onSuccess() {
          toast.success(m.password_change_success());
        },
        onError() {
          toast.error(m.password_change_failed());
        },
      },
    );
  }

  if (newUserNickname.value !== "") {
    await authClient.updateUser(
      {
        name: newUserNickname.value,
      },
      {
        onSuccess() {
          toast.success(m.nickname_saved());
        },
        onError() {
          toast.error(m.nickname_save_failed());
        },
      },
    );
  }

  toast.update(loadingToast, {
    title: m.changes_saved(),
    type: "success",
  });

  clearFields();
}
</script>

<template>
  <div class="settingsWrapper">
    <div class="settingsGroup">
      <h2>{{ m.account_settings() }}</h2>
      <div class="inputGroup">
        <label for="userNickname">{{ m.nickname() }}</label>
        <input type="text" id="userNickname" v-model="newUserNickname" :placeholder="m.nickname_placeholder()" />
      </div>
    </div>

    <div class="settingsGroup">
      <h2>{{ m.login_settings() }}</h2>
      <p>{{ m.login_settings_desc() }}</p>
      <div class="inputGroup">
        <label for="userPassword">{{ m.new_email() }}</label>
        <input type="email" id="userPassword" v-model="newUserEmail" :placeholder="m.email_placeholder()" />
      </div>

      <hr />

      <div class="inputGroup">
        <label for="userPassword">{{ m.old_password() }}</label>
        <input type="password" id="userPassword" v-model="oldUserPassword" :placeholder="m.old_password_placeholder()" />
      </div>
      <div class="inputGroup">
        <label for="userPassword">{{ m.new_password() }}</label>
        <input type="password" id="userPassword" v-model="newUserPassword" :placeholder="m.new_password_placeholder()" />
      </div>
    </div>

    <button @click="saveUserSettings()">{{ m.save_settings() }}</button>
  </div>
</template>

<style lang="scss">
.settingsWrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: var(--max-content-width);
  gap: 24px;

  .settingsGroup {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .inputGroup {
      display: flex;
      flex-direction: column;
      max-width: 350px;

      label {
        color: var(--dimmed-text);
      }

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
  }

  hr {
    width: 350px;
    margin: 12px 0;
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
