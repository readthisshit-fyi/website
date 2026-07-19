<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import FishIcon from "../assets/fshhhhh.svg?component";
import RatingStars from "./ratingStars.vue";
import EmblaCarousel from "./emblaCarousel.vue";
import { m } from "../paraglide/messages.js";
import { getLocale } from "../paraglide/runtime.js";
import { authClient } from "./lib/auth-client";

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

// Review form state
const userAccount = ref(null);
const reviewText = ref("");
const reviewRating = ref(3);
const isSubmittingReview = ref(false);

onMounted(async () => {
  window.__lenis.stop();
  const session = await authClient.getSession();
  userAccount.value = session;
});

onUnmounted(() => window.__lenis.start());

async function submitReview() {
  if (!reviewText.value.trim() || !userAccount.value) return;

  isSubmittingReview.value = true;
  try {
    // TODO: Add API call to submit review
    // await submitReviewAPI(card.id, reviewText.value, reviewRating.value);
    reviewText.value = "";
    reviewRating.value = 3;
  } catch (error) {
    console.error("Error submitting review:", error);
  } finally {
    isSubmittingReview.value = false;
  }
}
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
            {{ m.websiteModal_suggestedBy({ name: creatorName, date: creatorDate.toLocaleString(getLocale()) }) }}<br />
            {{ m.websiteModal_approvedBy({ name: moderatorName, date: moderatorDate.toLocaleString(getLocale()) }) }}
          </p>
        </div>
        <!-- <div class="newsByTheWebsite">
            <p class="newsTitle">Changelog & News</p>
          </div> -->
      </div>
      <div class="right">
        <div class="title">
          <p>{{ m.websiteModal_communityReviews() }}</p>
          <RatingStars :rating="cardRating"></RatingStars>
        </div>
        <hr />
        <div class="reviews">
          <div v-for="review in card['reviews']" class="reviewContainer">
            <div class="reviewInfo">
              <p class="author">{{ review.author }}</p>
              <p class="reviewTime">{{ new Date(review.date).toLocaleString(getLocale()) }}</p>
              <RatingStars :rating="review.rating" class="reviewRating"></RatingStars>
            </div>
            <p class="reviewBody">{{ review.text }}</p>
            <hr v-if="!(review === card['reviews'][card['reviews'].length - 1])" />
          </div>
        </div>

        <!-- Review Form - Only show if user is logged in -->
        <div v-if="userAccount" class="reviewForm">
          <hr />
          <p class="formTitle">{{ m.websiteModal_writeReview?.() || "Write a Review" }}</p>

          <div class="formGroup">
            <label for="reviewRating">Rating:</label>
            <div class="ratingSelector">
              <button
                v-for="star in 5"
                :key="star"
                :class="['starButton', { active: reviewRating >= star }]"
                @click="reviewRating = star"
                type="button"
              >
                ★
              </button>
              <span class="ratingValue">{{ reviewRating }}/5</span>
            </div>
          </div>

          <div class="formGroup">
            <label for="reviewText">Review:</label>
            <textarea
              id="reviewText"
              v-model="reviewText"
              placeholder="Share your thoughts about this website..."
              class="reviewTextarea"
              rows="4"
            ></textarea>
          </div>

          <button class="submitButton" @click="submitReview" :disabled="!reviewText.trim() || isSubmittingReview">
            {{ isSubmittingReview ? "Submitting..." : "Submit Review" }}
          </button>
        </div>

        <!-- Login prompt - Show if user is NOT logged in -->
        <div v-else class="loginPrompt">
          <hr />
          <p>{{ m.websiteModal_loginToReview?.() || "Log in to write a review" }}</p>
        </div>
        <div class="buttons">
          <button>
            <p>{{ m.websiteModal_openWebsite() }}</p>
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

<style lang="scss" scoped>
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

    border-radius: 4px;
    border: 2px solid var(--dimmed-text-two);
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
          color: var(--dimmed-text);
          font-size: 20px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }

        .creatorAndModerator {
          color: var(--dimmed-text-two);
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
        height: 2px;
        width: 100%;
        align-self: stretch;

        border-radius: 31px;
        background: var(--dimmed-text-two);
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
          background: var(--dimmed-text-two);
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
              font-weight: 500;
              line-height: normal;
            }

            .reviewTime {
              color: var(--dimmed-text);
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
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
        flex-direction: row;
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
            color: var(--text);
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
          padding: 8px 16px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          flex: 1 0 0;
          flex-direction: row;
          width: 100%;

          border-radius: 4px;
          border: 2px solid var(--text);
          background: var(--background);
          transition: 0.1s ease all;

          &:hover {
            p {
              color: var(--background);
            }

            background: var(--text);
            color: var(--background);
            transition: 0.1s ease all;
            border: 2px solid var(--dimmed-text);

            svg {
              color: var(--background);
            }
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

      .reviewForm {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-top: 16px;
        align-self: stretch;

        hr {
          height: 2px;
          width: 100%;
          border-radius: 31px;
          background: var(--dimmed-text-two);
          border: 0;
          margin: 0;
        }

        .formTitle {
          color: var(--text);
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-self: stretch;

          label {
            color: var(--text);
            font-size: 16px;
            font-weight: 500;
          }

          .ratingSelector {
            display: flex;
            align-items: center;
            gap: 8px;

            .starButton {
              width: 32px;
              height: 32px;
              padding: 0;
              border: 2px solid var(--dimmed-text-two);
              background: var(--background);
              border-radius: 4px;
              color: var(--dimmed-text-two);
              font-size: 18px;
              cursor: pointer;
              transition: all 0.2s ease;
              display: flex;
              align-items: center;
              justify-content: center;

              &.active {
                color: var(--text);
                border-color: var(--text);
                background: var(--text);
                color: var(--background);
              }

              &:hover {
                border-color: var(--text);
              }
            }

            .ratingValue {
              color: var(--dimmed-text);
              font-size: 16px;
              margin-left: 8px;
            }
          }

          .reviewTextarea {
            width: 100%;
            padding: 8px;
            background: var(--background);
            border: 2px solid var(--text);
            border-radius: 4px;
            color: var(--text);
            font-family: inherit;
            font-size: 14px;
            resize: vertical;
            min-height: 80px;
            transition: all 0.2s ease;

            &:focus {
              border-color: var(--text);
              background: var(--background);
            }

            &::placeholder {
              color: var(--dimmed-text);
            }
          }
        }

        .submitButton {
          display: flex;
          padding: 8px 16px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          width: auto;

          border-radius: 4px;
          border: 2px solid var(--text);
          background: var(--background);
          color: var(--text);
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover:not(:disabled) {
            background: var(--text);
            color: var(--background);
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }
      }

      .loginPrompt {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-top: 16px;
        align-self: stretch;

        hr {
          height: 2px;
          width: 100%;
          border-radius: 31px;
          background: var(--dimmed-text-two);
          border: 0;
          margin: 0;
        }

        p {
          color: var(--dimmed-text);
          font-size: 16px;
          font-style: italic;
          margin: 0;
        }
      }
    }
  }
}
</style>
