<script setup>
import { ref } from "vue";
import { setLocale, locales, localizeHref, getLocale } from "../paraglide/runtime.js";

import { Icon } from "@iconify/vue";

let isOpen = ref(false);
const pathname = location.pathname;

const langPicker = document.getElementById("langPicker");

document.addEventListener("click", () => {
  langPicker?.classList.remove("open");
});

document.querySelectorAll(".languageOption").forEach((el) => {
  el.addEventListener("click", async (e) => {
    e.preventDefault();

    const locale = el.dataset.locale;
    console.log("Clicked:", locale);

    if (!locale) return;

    await setLocale(locale, { reload: false });

    console.log("After setLocale:", document.cookie);

    const href = el.getAttribute("href");
    if (href) {
      window.location.assign(href);
    }
  });
});
</script>

<template>
  <div class="languagePickerWrapper">
    <button class="languageButton" @click="isOpen = !isOpen">
      <Icon :icon="`circle-flags:lang-${getLocale()}`" />
    </button>

    <div class="languagePicker" id="langPicker" :class="{ open: isOpen }">
      <a
        v-for="locale in locales"
        :href="
          localizeHref(pathname, {
            locale,
          })
        "
        :key="locale"
        class="languageOption"
        :data-locale="locale"
      >
        <Icon :icon="`circle-flags:lang-${locale}`" />
        <span>{{ locale.toUpperCase() }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.languagePickerWrapper {
  position: relative;
  display: flex;
  align-items: center;

  .languageButton {
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
    color: var(--text);

    font-weight: 500;

    &:hover {
      background: var(--text);
      transition: 0.1s all linear;
    }
  }

  .languagePicker {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    display: none;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    gap: 4px;
    padding: 8px;
    background: var(--background);
    border: 3px solid var(--text);
    border-radius: 8px;
    width: max-content;
    z-index: 10;

    &.open {
      display: grid;
    }

    .languageOption {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      border-radius: 6px;
      color: var(--text);
      text-decoration: none;
      font-weight: 500;
      font-size: 16px;
      transition: background 0.05s ease;

      &:hover {
        background: color-mix(in srgb, var(--text) 10%, transparent);
      }

      svg {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        border: 2px solid var(--text);
        border-radius: 50%;
      }
    }
  }
}
</style>
