<script setup>
import { computed, ref, onMounted } from "vue";
import { authClient } from "./lib/auth-client";
import ArrowDownBoldIcon from "@iconify-vue/ep/arrow-down-bold";
import { toast } from "@oscarrc/crust/vanilla";
import { m } from "../paraglide/messages";

const userAccount = ref(null);
const dropdownOpen = ref(false);
const currentUser = computed(() => userAccount.value?.data?.user ?? null);

onMounted(async () => {
  const session = await authClient.getSession();
  userAccount.value = session;
});

async function logout() {
  await authClient.signOut();
  toast.info(m.logged_out());
  userAccount.value = null;
  dropdownOpen.value = false;
}

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
</script>

<template>
  <!-- Logged In: Account Dropdown -->
  <div v-if="currentUser" class="accountContainer">
    <button class="accountButton" @click="toggleDropdown">
      <span class="userName">{{ currentUser.name }}</span>
      <span class="dropdown-icon" :class="{ open: dropdownOpen }"><ArrowDownBoldIcon height="1em" /></span>
    </button>
    <div v-if="dropdownOpen" class="accountInfoDropdown">
      <a href="/user/settings">{{ m.settings() }}</a>
      <hr />
      <button class="logoutButton" @click="logout">{{ m.logout() }}</button>
    </div>
  </div>

  <!-- Logged Out: Login/Register Buttons -->
  <div v-else class="loginAndRegisterButtons">
    <a href="/user/login">{{ m.login() }}</a>
    <a href="/user/register">{{ m.register() }}</a>
  </div>
</template>

<style lang="scss" scoped>
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
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: auto;

    hr {
      margin: 0;
      border: none;
      height: 2px;
      background: var(--dimmed-text-two);
      width: 100%;
    }

    button,
    a {
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
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
