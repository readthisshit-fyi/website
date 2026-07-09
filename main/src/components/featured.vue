<script>
const featuredWebsites = await fetch("http://localhost:3000/featured").then((res) => res.json());
</script>

<script setup>
import { ref } from "vue";
import websiteCard from "./websiteCard.vue";
import websiteInfoModal from "./websiteInfoModal.vue";

let currentModalJson = ref(null);
</script>

<template>
  <section class="wrapper">
    <div v-for="(category, categoryName) in featuredWebsites" class="category">
      <h1>{{ String(categoryName) }}</h1>
      <div class="categoryGrid">
        <websiteCard v-for="website in category" :obj="website" class="website" @changeModal="(x) => (currentModalJson = x)" />
      </div>
    </div>
  </section>

  <Teleport v-if="currentModalJson" to="body">
    <websiteInfoModal :json="currentModalJson" @closeModal="currentModalJson = null"></websiteInfoModal>
  </Teleport>
</template>

<style lang="scss">
.wrapper {
  display: flex;
  gap: 40px;
  flex-direction: column;

  .category {
    h1 {
      margin-bottom: 10px;
    }
    .categoryGrid {
      display: inline-grid;
      width: 1000px;
      row-gap: 2px;
      column-gap: 2px;
      grid-template-rows: repeat(2, 240px);
      grid-template-columns: repeat(3, 1fr);
      grid-auto-flow: row;

      border-radius: 12px;
      border: 2px solid var(--text);
      background: var(--text);

      overflow: hidden;
    }
  }
}
</style>
