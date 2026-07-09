<script setup>
import "../style/colors.css";
const props = defineProps(["obj"]);
const cardObject = props.obj;
</script>

<template>
  <div class="articleContainer" @click="$emit('changeModal', cardObject)">
    <p class="articleName">{{ cardObject["websiteTitle"] }}</p>
  </div>
</template>

<style lang="scss" scoped>
.articleContainer {
  border-bottom: transparent 2px solid;
  display: flex;
  flex-direction: column;
  transition: ease-in-out 0.2s border-bottom;

  &:hover {
    transition: ease-in-out 0s border-bottom;
    border-bottom: var(--text) 2px solid;
    cursor: pointer;
  }

  .articleName {
    user-select: none;
    font-size: 18px;
  }
}
</style>
