<script setup>
import useEmblaCarousel from "embla-carousel-vue";
import { ref } from "vue";
const props = defineProps(["images"]);

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

const goToPrev = () => emblaApi.value?.goToPrev();
const goToNext = () => emblaApi.value?.goToNext();

const goTo = (index) => emblaApi.value.goTo(index);

const imageOpen = ref(false);
const imageSrc = ref("");
const openImage = (src) => {
  imageSrc.value = src;
  imageOpen.value = true;
};
</script>

<template>
  <div class="embla">
    <div class="embla__viewport" ref="emblaRef">
      <div class="embla__container">
        <div v-for="image in images" class="embla__slide" @click="openImage(image)">
          <img v-bind:src="image" alt="Screenshot" />
        </div>
      </div>
    </div>
    <div class="embla-thumbs">
      <div class="embla-thumbs__viewport">
        <div class="embla-thumbs_container">
          <!-- !Redo this as the button's background? -->
          <div v-for="(image, index) in images" class="embla-thumbs__slide">
            <button @click="goTo(index)" class="embla-thumbs__slide__button">
              <img :src="image" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <button class="embla__prev" @click="goToPrev">Scroll to prev</button>
    <button class="embla__next" @click="goToNext">Scroll to next</button> -->
  </div>

  <Teleport to="body" v-if="imageOpen">
    <div class="fullScreenImageContainer" @click="imageOpen = false">
      <img :src="imageSrc" alt="" />
    </div>
  </Teleport>
</template>

<style lang="scss">
.fullScreenImageContainer {
  position: fixed;
  top: 0;
  left: 0;
  background: var(--background-transparent);
  width: 100%;
  height: 100%;
  z-index: 1001;

  display: flex;
  padding: 2%;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 16px;
    border: 3px solid var(--background);
    height: 100%;
    width: auto;
  }
}

.embla {
  width: 100%;
  height: auto;

  .embla__viewport {
    overflow: hidden;
    width: 100%;
    height: auto;

    .embla__container {
      display: flex;
      touch-action: pan-y pinch-zoom;
      width: 100%;
      height: auto;

      .embla__slide {
        flex: 0 0 100%;
        min-width: 0;
        width: auto;
        height: auto;

        max-width: 100%;
        max-height: 50vh;

        display: flex;
        justify-content: center;

        img {
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid rgba(250, 243, 227, 0.25);
        }
      }
    }
  }

  .embla-thumbs {
    .embla-thumbs__viewport {
      .embla-thumbs_container {
        height: 80px;
        overflow: hidden;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: 8px;

        padding: 10px 0;

        .embla-thumbs__slide {
          height: 100%;

          .embla-thumbs__slide__button {
            height: 100%;
            background: 0;
            border: 0;
            padding: 0;
            margin: 0;
            border: 3px solid transparent;
            transition: border-color 0.2s ease;
            border-radius: 8px;

            cursor: pointer;
            &:hover {
              border: var(--text) 3px solid;
            }

            img {
              height: 100%;
              border-radius: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
