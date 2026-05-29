<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  slides: {
    type: Array,
    default: () => [],
  },
})

const currentIndex = ref(0)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let intervalId

const currentSlide = computed(() => props.slides[currentIndex.value] ?? {})

function nextSlide() {
  if (!props.slides.length) {
    return
  }

  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

onMounted(() => {
  if (!reduceMotion && props.slides.length > 1) {
    intervalId = window.setInterval(nextSlide, 7000)
  }
})

onBeforeUnmount(() => {
  if (intervalId) {
    window.clearInterval(intervalId)
  }
})
</script>

<template>
  <section class="hero-stage">
    <transition name="hero-fade" mode="out-in">
      <article :key="currentSlide.image" class="hero-slide">
        <img
          :src="currentSlide.image"
          :alt="currentSlide.alt"
          class="hero-image"
          fetchpriority="high"
          decoding="async"
        />
        <div class="hero-overlay"></div>
        <div class="shell hero-content">
          <div class="hero-copy">
            <p class="eyebrow">{{ currentSlide.label }}</p>
            <h2>{{ currentSlide.title }}</h2>
            <p class="hero-subtitle">
              {{ currentSlide.description }}
            </p>
            <div class="hero-actions">
              <RouterLink class="button button-primary" :to="currentSlide.href">learn more</RouterLink>
            </div>
          </div>
        </div>
      </article>
    </transition>

    <div class="hero-dots shell" aria-label="Hero slides">
      <button
        v-for="(slide, index) in slides"
        :key="slide.image"
        :class="['hero-dot', { active: index === currentIndex }]"
        type="button"
        @click="currentIndex = index"
      >
        <span class="sr-only">{{ slide.label }} slide {{ index + 1 }}</span>
      </button>
    </div>
  </section>
</template>
