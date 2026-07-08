<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import FishIcon from "../assets/fshhhhh.svg?component";
import RatingStars from "./ratingStars.vue";
import EmblaCarousel from "./emblaCarousel.vue";

const props = defineProps(["json"]);
const card = props.json;

const cardTitle = card["websiteTitle"];
const cardDesc = card["websiteDesc"];
const cardURL = card["websiteURL"];
const cardCat = card["websiteCategory"];
const cardFishCount = card["fishCount"];
const cardRating = card["rating"];

const creatorName = card["creator"]["name"];
const creatorDate = new Date(card["creator"].date);
const moderatorName = card["moderator"].name;
const moderatorDate = new Date(card["moderator"].date);

onMounted(() => window.__lenis.stop());
onUnmounted(() => window.__lenis.start());
</script>

<template>
  <div @click="$emit('closeModal')" class="modalContainer">
    <div class="modal" @click.stop>
      <div class="left">
        <EmblaCarousel :images="card.images" />
        <div class="generalInfoInfo">
          <p class="title">
            {{ cardTitle }}
          </p>
          <p class="desc">
            {{ cardDesc }}
          </p>
          <p class="creatorAndModerator">
            Suggested by {{ creatorName }} on {{ creatorDate.toUTCString() }}<br />Approved by {{ moderatorName }} on
            {{ moderatorDate.toUTCString() }}
          </p>
        </div>
        <!-- <div class="newsByTheWebsite">
            <p class="newsTitle">Changelog & News</p>
          </div> -->
      </div>
      <div class="right">
        <div class="title">
          <p>Community Reviews</p>
          <RatingStars :rating="cardRating"></RatingStars>
        </div>
        <hr />
        <div class="reviews">
          <div v-for="review in card['reviews']" class="reviewContainer">
            <div class="reviewInfo">
              <p class="author">{{ review.author }}</p>
              <p class="reviewTime">{{ new Date(review.date).toUTCString() }}</p>
              <RatingStars :rating="review.rating" class="reviewRating"></RatingStars>
            </div>
            <p class="reviewBody">{{ review.text }}</p>
            <hr v-if="!(review === card['reviews'][card['reviews'].length - 1])" />
          </div>
        </div>
        <div class="buttons">
          <button>
            <p>Open Website</p>
          </button>
          <div class="lowerButtons">
            <button class="fish">
              <p>{{ cardFishCount }}</p>
              <FishIcon />
            </button>
            <!-- <button class="collect"></button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modalContainer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--background-transparent);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  cursor: pointer;
  z-index: 1000;

  .modal {
    display: flex;
    width: 80%;
    height: 90%;
    padding: 32px;
    align-items: stretch;
    gap: 32px;
    flex-shrink: 0;

    cursor: auto;

    border-radius: 16px;
    border: 2px solid rgba(250, 243, 227, 0.25);
    background: var(--background);

    .left {
      width: 55%;
      height: 100%;
      display: flex;
      flex-direction: column;

      align-items: flex-start;
      gap: 32px;
      flex-shrink: 0;
      align-self: stretch;

      overflow-y: auto;

      padding-right: 8px;

      .generalInfoInfo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;

        .title {
          color: var(--text);
          font-size: 32px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }

        .desc {
          color: rgba(250, 243, 227, 0.9);
          font-size: 20px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }

        .creatorAndModerator {
          color: rgba(250, 243, 227, 0.75);
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.3;
        }
      }
      .newsByTheWebsite {
        .newsTitle {
          color: var(--text);
          font-size: 24px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }
    }

    .right {
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1 0 0;
      align-self: stretch;

      overflow: hidden;

      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        p {
          color: var(--text);
          font-size: 24px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }

      hr {
        height: 4px;
        width: 100%;
        align-self: stretch;

        border-radius: 31px;
        background: rgba(250, 243, 227, 0.25);
        border: 0;
      }

      .reviews {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        flex: 1 0 0;
        align-self: stretch;
        min-height: 0;

        overflow-y: auto;
        scrollbar-width: thin;
        padding-right: 16px;

        hr {
          height: 2px;
          width: 50%;
          background: rgba(250, 243, 227, 0.25);
          border: 0;
        }

        .reviewContainer {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          align-self: stretch;

          .reviewInfo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;

            .author {
              color: var(--text);
              font-size: 20px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }

            .reviewTime {
              color: rgba(250, 243, 227, 0.7);
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
          }

          .reviewBody {
            align-self: stretch;

            color: var(--text);
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        }
      }

      .buttons {
        display: flex;
        width: 100%;
        height: auto;
        padding-top: 10px;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;

        .fish {
          flex: 1;
          align-self: stretch;

          p {
            white-space: nowrap;
          }

          svg {
            height: 1.5em;
            width: auto;
          }
        }

        .lowerButtons {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          align-self: stretch;
        }

        button {
          display: flex;
          padding: 12px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex: 1 0 0;
          flex-direction: row;
          width: 100%;

          border-radius: 6px;
          border: 2px solid rgba(250, 243, 227, 0.5);
          background: var(--Background, #131313);
          transition: 0.1s ease border-color;

          &:hover {
            border: 2px solid rgba(250, 243, 227, 0.75);
            transition: 0.1s ease border-color;
          }

          p {
            color: var(--text);
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
          }
        }
      }
    }
  }
}
</style>
