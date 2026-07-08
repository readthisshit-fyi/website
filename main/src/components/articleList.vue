<script setup>
import { ref } from "vue";
import Article from "./article.vue";
import websiteInfoModal from "./websiteInfoModal.vue";

let currentModalJson = ref(null);

const allArticles = await fetch("http://localhost:3000/articles").then((res) => res.json());
</script>

<template>
  <div v-for="(category, index) in allArticles" class="category">
    <h2>{{ index }}</h2>
    <hr />
    <Article v-for="article in category" :json="article" @changeModal="(x) => (currentModalJson = x)"></Article>
  </div>

  <Teleport v-if="currentModalJson" to="body">
    <websiteInfoModal :json="currentModalJson" @closeModal="currentModalJson = null"></websiteInfoModal>
  </Teleport>
</template>

<style lang="scss">
.category {
  margin-bottom: 64px;
  width: var(--max-content-width);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 4px;

  h2 {
    font-size: 32px;
  }

  hr {
    width: 100%;
    height: 2px;
    background: var(--text);
    border: 0;
  }
}
</style>
