<script setup>
import FishIcon from "../assets/fshhhhh.svg?component";
</script>

<template>
  <div class="card">
    <div>
      <p class="cardTitle">Privacy Guides</p>
      <p class="cardDescription">
        Established in 2021, Privacy Guides is the most popular & trustworthy non-profit resource to find privacy tools and learn about
        protecting your digital life.
      </p>
    </div>
    <hr />
    <div class="cardRow additionalInfo">
      <p class="cardUrl">privacyguides.org</p>
      <p class="cardCategory">Software</p>
    </div>
    <div class="cardRow">
      <div class="fishCounter">
        <p>10k</p>
        <FishIcon />
      </div>
      <div class="ratingContainer">
        <div class="stars"></div>
        <p class="rating">4.9/5</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  padding: 15px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
  grid-row: span 1;
  grid-column: span 1;
  justify-self: stretch;
  user-select: none;

  background: var(--background);

  transition: background 0.2s ease;
  cursor: pointer;

  hr {
    transition: background 0.2s ease;
  }

  &:hover {
    background: var(--background-hover);
  }

  .additionalInfo {
    p {
      color: var(--dimmed-text-two);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .cardTitle {
    color: var(--text);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .cardDescription {
    overflow: hidden;
    color: var(--dimmed-text);
    text-overflow: ellipsis;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    height: 96px;
    align-self: stretch;
  }

  hr {
    width: 100%;
    height: 2px;

    border-radius: 19px;
    background: var(--text);
    box-shadow: 0;
    border: 0;
  }

  .cardRow {
    gap: auto;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }

  .ratingContainer {
    .rating {
      color: var(--text);
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  .fishCounter {
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;

    p {
      color: var(--text);
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    svg {
      height: 100%;
      align-self: stretch;
      aspect-ratio: 1/1;
    }
  }
}
</style>
