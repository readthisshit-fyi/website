<script>
const featuredWebsites = await fetch("http://localhost:3000/featured").then((res) => res.json());
</script>

<script setup>
import FeaturedPick from "./featuredPick.vue";
</script>

<template>
  <section class="wrapper">
    <div v-for="(category, categoryName) in featuredWebsites" class="category">
      <h1>{{ String(categoryName) }}</h1>
      <div class="categoryGrid">
        <FeaturedPick v-for="website in category" :json="JSON.stringify(website)" class="website" />
      </div>
    </div>
  </section>
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
