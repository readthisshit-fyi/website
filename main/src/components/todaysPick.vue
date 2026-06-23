<script>
const todaysWebsites = await fetch("http://localhost:3000/todayspicks").then((res) => res.json());
</script>

<script setup>
import { ref } from "vue";
import FishIcon from "../assets/fshhhhh.svg?component";
import StarIcon from "../assets/star.svg?component";

const props = defineProps(["num"]);

const card = todaysWebsites[Number(props.num) - 1];

const cardTitle = ref(card["websiteTitle"]);
const cardDesc = ref(card["websiteDesc"]);
const cardURL = ref(card["websiteURL"]);
const cardCat = ref(card["websiteCategory"]);
const cardFishCount = ref(card["fishCount"]);
const cardRating = ref(card["rating"]);
</script>

<template>
  <div class="card">
    <div>
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
      <div class="ratingContainer">
        <div class="stars" :style="{ '--fill': (cardRating / 5) * 100 + '%' }">
          <div class="stars-bg">
            <StarIcon v-for="i in 5" :key="i" />
          </div>
          <div class="stars-fill">
            <StarIcon v-for="i in 5" :key="i" />
          </div>
        </div>
        <p class="rating">{{ cardRating }}/5</p>
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
    display: flex;
    align-items: center;
    gap: 4px;
    align-self: stretch;

    .rating {
      color: var(--text);
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .stars {
      position: relative;
      display: inline-flex;

      .stars-bg,
      .stars-fill {
        display: flex;
        align-items: center;

        svg {
          width: 26px;
          height: 26px;
          margin-left: -12px;
          flex-shrink: 0;

          &:first-child {
            margin-left: 0;
          }
        }
      }

      .stars-bg {
        svg {
          color: var(--dimmed-text-two);
        }
      }

      .stars-fill {
        position: absolute;
        top: 0;
        left: 0;
        width: var(--fill);
        overflow: hidden;

        svg {
          color: var(--text);
          filter: drop-shadow(-3px 0px 2px rgba(0, 0, 0, 0.3));
        }
      }
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
