<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const current = document.documentElement.getAttribute("data-theme");
const theme = ref(document.documentElement.dataset.theme ?? "dark");

function switchTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem("theme", theme.value);
}
</script>

<template>
  <button class="themeSwitcher" @click="switchTheme">
    <Icon v-if="theme === 'dark'" icon="tabler:moon" />
    <Icon v-else icon="lucide:sun" />
  </button>
</template>

<style lang="scss" scoped>
.hidden {
  display: none;
}

[data-theme="dark"] .sun {
  display: none;
}

[data-theme="light"] .moon {
  display: none;
}

.themeSwitcher {
  background: none;
  display: flex;
  width: 34px;
  height: 34px;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 2px solid var(--text);
  aspect-ratio: 1/1;
  flex-shrink: 0;
  transition: 0.1s all linear;

  svg {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    color: var(--text);
  }

  &:hover {
    background: var(--text);
    transition: 0.1s all linear;

    svg {
      color: var(--background);
    }
  }
}
</style>
