<script setup>
import FishIcon from "../assets/fshhhhh.svg?component";
import RatingStars from "./ratingStars.vue";

const props = defineProps(["obj"]);

const card = props.obj;

const cardTitle = card["websiteTitle"];
const cardDesc = card["websiteDesc"];
const cardURL = card["websiteURL"];
const cardCat = card["websiteCategory"];
const cardFishCount = card["fishCount"];
const cardRating = card["rating"];
</script>

<template>
  <!--
  ..######.....###....########..########.....########.########.##.....##.########..##..........###....########.########
  .##....##...##.##...##.....##.##.....##.......##....##.......###...###.##.....##.##.........##.##......##....##......
  .##........##...##..##.....##.##.....##.......##....##.......####.####.##.....##.##........##...##.....##....##......
  .##.......##.....##.########..##.....##.......##....######...##.###.##.########..##.......##.....##....##....######..
  .##.......#########.##...##...##.....##.......##....##.......##.....##.##........##.......#########....##....##......
  .##....##.##.....##.##....##..##.....##.......##....##.......##.....##.##........##.......##.....##....##....##......
  ..######..##.....##.##.....##.########........##....########.##.....##.##........########.##.....##....##....########
  -->

  <div class="card" @click="$emit('changeModal', card)"">
    <div class="cardContent">
      <p class="cardTitle">{{ cardTitle }}</p>
      <p class="cardDescription">
        {{ cardDesc }}
      </p>
    </div>
    <hr />
    <div class="cardRow additionalInfo">
      <p class="cardUrl">{{ cardURL }}</p>
      <p class="cardCategory">{{ cardCat }}</p>
    </div>
    <div class="cardRow">
      <div class="fishCounter">
        <p>{{ cardFishCount }}</p>
        <FishIcon />
      </div>
      <RatingStars :rating="cardRating"></RatingStars>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// ..######.....###....########..########......######...######...######.
// .##....##...##.##...##.....##.##.....##....##....##.##....##.##....##
// .##........##...##..##.....##.##.....##....##.......##.......##......
// .##.......##.....##.########..##.....##....##........######...######.
// .##.......#########.##...##...##.....##....##.............##.......##
// .##....##.##.....##.##....##..##.....##....##....##.##....##.##....##
// ..######..##.....##.##.....##.########......######...######...######.

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
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;

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

  .cardContent {
    width: 100%;
    align-self: stretch;
    min-width: 0;
  }

  .cardTitle {
    color: var(--text);
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    max-width: 100%;
    flex-shrink: 1;
    min-width: 0;
  }

  .cardDescription {
    display: -webkit-box;
    overflow: hidden;
    color: var(--dimmed-text);
    text-overflow: ellipsis;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.4;

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

  .fishCounter {
    display: flex;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
    font-size: 20px;

    p {
      color: var(--text);
      font-style: normal;
      font-weight: 400;
      line-height: 1;
    }

    svg {
      height: 100%;
      aspect-ratio: 1/1;
      height: 1em;
      width: auto !important;
    }
  }
}
</style>
