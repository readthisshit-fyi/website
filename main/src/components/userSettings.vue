<script setup>
import { ref } from "vue";
import { authClient } from "./lib/auth-client";
import { toast } from "@oscarrc/crust/vanilla";

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
  let loadingToast = toast.loading("Saving settings..");

  if (newUserEmail.value !== "") {
    await authClient.changeEmail(
      {
        newEmail: newUserEmail.value,
      },
      {
        onSuccess() {
          toast.success("New saved!", { message: "Check your new email and the spam folder." });
        },
        onError() {
          toast.error("Failed to save the email...");
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
          toast.success("Password changed successfully!");
        },
        onError() {
          toast.error("Failed to save the password...");
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
          toast.success("Your nickname has been changed!");
        },
        onError() {
          toast.error("Failed to save your nickname.");
        },
      },
    );
  }

  toast.update(loadingToast, {
    title: "Changes saved!",
    type: "success",
  });

  clearFields();
}
</script>

<template>
  <div class="settingsWrapper">
    <div class="settingsGroup">
      <h2>Account settings</h2>
      <div class="inputGroup">
        <label for="userNickname">Nickname</label>
        <input type="text" id="userNickname" v-model="newUserNickname" placeholder="Nickname" />
      </div>
    </div>

    <div class="settingsGroup">
      <h2>Login settings</h2>
      <p>For the following fields you can leave them empty if you dont want to change anything</p>
      <div class="inputGroup">
        <label for="userPassword">New Email</label>
        <input type="email" id="userPassword" v-model="newUserEmail" placeholder="New email" />
      </div>

      <hr />

      <div class="inputGroup">
        <label for="userPassword">Old password</label>
        <input type="password" id="userPassword" v-model="oldUserPassword" placeholder="Old password" />
      </div>
      <div class="inputGroup">
        <label for="userPassword">New password</label>
        <input type="password" id="userPassword" v-model="newUserPassword" placeholder="New password" />
      </div>
    </div>

    <button @click="saveUserSettings()">Save settings</button>
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
