<script setup>
import StarIcon from "../assets/star.svg?component";
const props = defineProps(["rating"]);
</script>

<template>
  <div class="ratingContainer">
    <div class="stars" :style="{ '--fill': (props.rating / 5) * 100 + '%' }">
      <div class="stars-bg">
        <StarIcon v-for="i in 5" :key="i" />
      </div>
      <div class="stars-fill">
        <StarIcon v-for="i in 5" :key="i" />
      </div>
    </div>
    <p class="rating">{{ props.rating }}/5</p>
  </div>
</template>

<style lang="scss">
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
</style>
