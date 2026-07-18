<script setup>
import { ref, onMounted } from "vue";
import { authClient } from "./lib/auth-client";
import ArrowDownBoldIcon from "@iconify-vue/ep/arrow-down-bold";
import { toast } from "@oscarrc/crust/vanilla";

const userAccount = ref(null);
const dropdownOpen = ref(false);

onMounted(async () => {
  const session = await authClient.getSession();
  userAccount.value = session;
});

async function logout() {
  await authClient.signOut();
  toast.info("You have been logged out.");
  userAccount.value = null;
  dropdownOpen.value = false;
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
</script>

<template>
  <!-- Logged In: Account Dropdown -->
  <div v-if="userAccount" class="accountContainer">
    <button class="accountButton" @click="toggleDropdown">
      <span class="userName">{{ userAccount.data.user?.name }}</span>
      <span class="dropdown-icon" :class="{ open: dropdownOpen }"><ArrowDownBoldIcon height="1em" /></span>
    </button>
    <div v-if="dropdownOpen" class="accountInfoDropdown">
      <div class="userInfo">
        <p class="label">Account</p>
        <p class="email">{{ userAccount.data.user?.email }}</p>
      </div>
      <hr />
      <button class="logoutButton" @click="logout">Logout</button>
    </div>
  </div>

  <!-- Logged Out: Login/Register Buttons -->
  <div v-else class="loginAndRegisterButtons">
    <a href="/user/login">Login</a>
    <a href="/user/login">Register</a>
  </div>
</template>

<style lang="scss">
.accountContainer {
  position: relative;

  .accountButton {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: var(--background);
    border: var(--text) 2px solid;
    border-radius: 4px;
    color: var(--text);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--text);
      color: var(--background);
    }

    .userName {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
    }

    .dropdown-icon {
      display: flex;
      font-size: 12px;
      transition: transform 0.2s ease;

      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .accountInfoDropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    background: var(--background);
    border: var(--text) 2px solid;
    border-radius: 4px;
    padding: 12px;
    min-width: 200px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    .userInfo {
      .label {
        font-size: 12px;
        color: var(--text);
        opacity: 0.7;
        margin: 0 0 4px 0;
        text-transform: uppercase;
      }

      .email {
        font-size: 14px;
        color: var(--text);
        margin: 0;
        word-break: break-all;
      }
    }

    hr {
      border: none;
      height: 2px;
      background: var(--text);
      opacity: 0.2;
      margin: 12px 0;
    }

    .logoutButton {
      width: 100%;
      padding: 8px 0;
      background: transparent;
      border: none;
      color: var(--text);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 4px;

      &:hover {
        background: var(--text);
        color: var(--background);
      }
    }
  }
}

.loginAndRegisterButtons {
  display: flex;
  gap: 12px;

  a {
    text-decoration: none;
    padding: 0 12px;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 2px solid var(--text);
    background: transparent;
    color: var(--text);

    display: flex;
    align-items: center;

    &:hover {
      background: var(--text);
      color: var(--background);
    }
  }
}
</style>
